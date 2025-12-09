/* ╔══════════════════════════════════════════════════════════════════════════════╗
   ║                                                                              ║
   ║                            CSV DATA LOADER                                   ║
   ║                                                                              ║
   ║   Utilities for loading CSV files and transforming them into ECharts data.   ║
   ║                                                                              ║
   ╠══════════════════════════════════════════════════════════════════════════════╣
   ║                                                                              ║
   ║   USAGE:                                                                     ║
   ║   ──────                                                                     ║
   ║   // In your Vue component:                                                  ║
   ║   import { loadCSV, csvToSeries } from '../utils/csvLoader'                  ║
   ║                                                                              ║
   ║   const data = await loadCSV('/data/metrics.csv')                            ║
   ║   const series = csvToSeries(data, {                                         ║
   ║     xColumn: 'date',                                                         ║
   ║     yColumns: ['revenue', 'costs'],                                          ║
   ║   })                                                                         ║
   ║                                                                              ║
   ╚══════════════════════════════════════════════════════════════════════════════╝ */

   import { seriesPresets } from '../config/chartStyles'
   import type { LineSeriesOption } from 'echarts'
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      TYPES
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export interface CSVRow {
     [key: string]: string | number
   }
   
   export interface CSVData {
     headers: string[]
     rows: CSVRow[]
     rowCount: number
   }
   
   export interface SeriesConfig {
     /** Column name to use for X-axis (categories/labels) */
     xColumn: string
     
     /** Column names to plot as Y-axis series */
     yColumns: string[]
     
     /** Optional: custom labels for each series (defaults to column names) */
     seriesLabels?: string[]
     
     /** Optional: preset style for each series */
     seriesPresets?: (keyof typeof seriesPresets)[]
     
     /** Optional: parse X values as dates and format them */
     xAsDate?: boolean
     xDateFormat?: 'short' | 'medium' | 'long' | 'monthYear' | 'year'
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      CSV PARSER
      
      Lightweight CSV parsing without external dependencies.
      Handles:
      - Comma and semicolon delimiters (auto-detected)
      - Quoted fields with commas inside
      - Numeric value detection
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export function parseCSV(csvText: string): CSVData {
     const lines = csvText.trim().split(/\r?\n/)
     if (lines.length === 0) {
       return { headers: [], rows: [], rowCount: 0 }
     }
     
     // Auto-detect delimiter (comma or semicolon)
     const firstLine = lines[0]
     const delimiter = firstLine.includes(';') && !firstLine.includes(',') ? ';' : ','
     
     // Parse header row
     const headers = parseLine(firstLine, delimiter)
     
     // Parse data rows
     const rows: CSVRow[] = []
     for (let i = 1; i < lines.length; i++) {
       const line = lines[i].trim()
       if (!line) continue
       
       const values = parseLine(line, delimiter)
       const row: CSVRow = {}
       
       headers.forEach((header, idx) => {
         const value = values[idx] ?? ''
         // Try to parse as number
         const num = parseFloat(value)
         row[header] = isNaN(num) ? value : num
       })
       
       rows.push(row)
     }
     
     return { headers, rows, rowCount: rows.length }
   }
   
   function parseLine(line: string, delimiter: string): string[] {
     const result: string[] = []
     let current = ''
     let inQuotes = false
     
     for (let i = 0; i < line.length; i++) {
       const char = line[i]
       
       if (char === '"') {
         if (inQuotes && line[i + 1] === '"') {
           current += '"'
           i++
         } else {
           inQuotes = !inQuotes
         }
       } else if (char === delimiter && !inQuotes) {
         result.push(current.trim())
         current = ''
       } else {
         current += char
       }
     }
     
     result.push(current.trim())
     return result
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      LOAD CSV FROM FILE
      
      Fetches and parses a CSV file from the public directory.
      ══════════════════════════════════════════════════════════════════════════════ */
   
    export async function loadCSV(path: string): Promise<CSVData> {
      try {
        // Account for Vite base path (e.g., /slidev/)
        const basePath = import.meta.env.BASE_URL || '/'
        const fullPath = path.startsWith('/') 
          ? `${basePath}${path.slice(1)}`  // Remove leading slash to avoid double slash
          : `${basePath}${path}`
        
        const response = await fetch(fullPath)
        if (!response.ok) {
          throw new Error(`Failed to load CSV: ${response.status} ${response.statusText}`)
        }
        const text = await response.text()
        return parseCSV(text)
      } catch (error) {
        console.error(`Error loading CSV from ${path}:`, error)
        throw error
      }
    }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      TRANSFORM CSV TO ECHARTS SERIES
      
      Converts CSV data into ECharts-compatible series and xAxis data.
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export interface ChartDataResult {
     /** Labels for X-axis */
     xAxisData: string[]
     
     /** ECharts series array */
     series: LineSeriesOption[]
     
     /** Original row count (before any sampling) */
     originalRowCount: number
   }
   
   export function csvToSeries(data: CSVData, config: SeriesConfig): ChartDataResult {
     const { xColumn, yColumns, seriesLabels, xAsDate, xDateFormat } = config
     
     // Extract X-axis values
     let xAxisData = data.rows.map(row => String(row[xColumn] ?? ''))
     
     // Format dates if requested
     if (xAsDate) {
       xAxisData = xAxisData.map(val => formatDate(val, xDateFormat))
     }
     
     // Build series for each Y column
     const series: LineSeriesOption[] = yColumns.map((col, idx) => {
       const presetKey = config.seriesPresets?.[idx] ?? 'standard'
       const preset = seriesPresets[presetKey] ?? seriesPresets.standard
       
       return {
         ...preset,
         name: seriesLabels?.[idx] ?? col,
         data: data.rows.map(row => {
           const val = row[col]
           return typeof val === 'number' ? val : parseFloat(String(val)) || 0
         }),
       }
     })
     
     return {
       xAxisData,
       series,
       originalRowCount: data.rowCount,
     }
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      DATE FORMATTING HELPERS
      ══════════════════════════════════════════════════════════════════════════════ */
   
   function formatDate(
     value: string, 
     format: SeriesConfig['xDateFormat'] = 'short'
   ): string {
     const date = new Date(value)
     if (isNaN(date.getTime())) return value
     
     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
     
     switch (format) {
       case 'short':
         // "1/15" or "12/3"
         return `${date.getMonth() + 1}/${date.getDate()}`
       case 'medium':
         // "Jan 15"
         return `${months[date.getMonth()]} ${date.getDate()}`
       case 'long':
         // "Jan 15, 2024"
         return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
       case 'monthYear':
         // "Jan 2024"
         return `${months[date.getMonth()]} ${date.getFullYear()}`
       case 'year':
         // "2024"
         return String(date.getFullYear())
       default:
         return value
     }
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      PRE-SAMPLING FOR EXTREMELY LARGE DATASETS
      
      While ECharts has built-in sampling, for 16k+ rows you may want to
      pre-sample the CSV data before passing to ECharts. This reduces memory
      usage and speeds up initial parsing.
      
      Uses LTTB (Largest Triangle Three Buckets) algorithm.
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export function presampleData(
     data: number[], 
     targetPoints: number
   ): number[] {
     if (data.length <= targetPoints) return data
     
     // LTTB implementation
     const sampled: number[] = []
     const bucketSize = (data.length - 2) / (targetPoints - 2)
     
     // Always include first point
     sampled.push(data[0])
     
     let prevIndex = 0
     
     for (let i = 0; i < targetPoints - 2; i++) {
       const bucketStart = Math.floor((i + 1) * bucketSize) + 1
       const bucketEnd = Math.min(Math.floor((i + 2) * bucketSize) + 1, data.length - 1)
       
       // Calculate average of next bucket (for area calculation)
       let avgX = 0
       let avgY = 0
       let count = 0
       const nextBucketStart = bucketEnd
       const nextBucketEnd = Math.min(Math.floor((i + 3) * bucketSize) + 1, data.length)
       
       for (let j = nextBucketStart; j < nextBucketEnd; j++) {
         avgX += j
         avgY += data[j]
         count++
       }
       avgX /= count || 1
       avgY /= count || 1
       
       // Find point in current bucket with largest triangle area
       let maxArea = -1
       let maxIndex = bucketStart
       
       const prevX = prevIndex
       const prevY = data[prevIndex]
       
       for (let j = bucketStart; j < bucketEnd; j++) {
         const area = Math.abs(
           (prevX - avgX) * (data[j] - prevY) - 
           (prevX - j) * (avgY - prevY)
         )
         
         if (area > maxArea) {
           maxArea = area
           maxIndex = j
         }
       }
       
       sampled.push(data[maxIndex])
       prevIndex = maxIndex
     }
     
     // Always include last point
     sampled.push(data[data.length - 1])
     
     return sampled
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      CONVENIENCE: Load and transform in one call
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export async function loadChartData(
     csvPath: string, 
     config: SeriesConfig
   ): Promise<ChartDataResult> {
     const data = await loadCSV(csvPath)
     return csvToSeries(data, config)
   }
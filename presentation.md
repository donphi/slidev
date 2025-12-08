# Board Assessment Management — Pitch Deck

## Full Deck Structure (28 slides)

| # | Slide | Section |
|---|-------|---------|
| 1 | Title | Opening |
| 2 | The Insight | Opening |
| 3 | Team & Advisors | Opening |
| 4 | Investment Philosophy | The Model |
| 5 | Investment Model (Scorecard) | The Model |
| 6 | Investment Strategy | The Model |
| 7 | Data Pipeline | The Model |
| 8 | Technical Infrastructure | The Model |
| 9 | Concept Validation | The Model |
| 10 | Backtest Methodology | The Model |
| 11 | Score Distribution | The Model |
| 12 | BAM Core Strategy | BAM Core |
| 13 | BAM Core Metrics | BAM Core |
| 14 | BAM Core Performance (Year-by-Year) | BAM Core |
| 15 | BAM Core Historical Top 10 | BAM Core |
| 16 | BAM Core Live Model | BAM Core |
| 17 | BAM Unconstrained Strategy | BAM Unconstrained |
| 18 | BAM Unconstrained Metrics | BAM Unconstrained |
| 19 | BAM Unconstrained Performance | BAM Unconstrained |
| 20 | BAM Unconstrained Live Model | BAM Unconstrained |
| 21 | Risk Management | Risk & Product |
| 22 | Initial Product | Risk & Product |
| 23 | Business Opportunity | The Opportunity |
| 24 | Principles & Vision | The Opportunity |
| 25 | Business Structure | The Opportunity |
| 26 | Capital Raise | The Ask |
| 27 | Shareholding | The Ask |
| 28 | Cash Flow | The Ask |
| 29 | Timeline | The Ask |

<div style="page-break-after: always;"></div>

## SLIDE 1 — Title

### Board Assessment Management

**Introduction & Capital Raise — December 2025**

*Quantifying what everyone knows but no one measures*

---

## SLIDE 2 — The Insight

### Everyone knows management matters. No one systematically measures it.

- Every investor says "we back great management teams"
- No one has a repeatable, quantitative framework to identify them
- We built one — and it generates alpha

**The gap we exploit:**  
Qualitative conviction → Quantitative signal → Systematic allocation

---

## SLIDE 3 — Team & Advisors

### Core Team

| Name | Role | Background |
|------|------|------------|
| **Johan Barkhuysen** | CEO | CFA, Former Head of Asset Management SA at Stonehage Fleming, Founder/CEO Rootstock (15 years) |
| **Francois Dercksen** | Data Analyst | Actuarial Science, Stellenbosch University |
| **Rohan van Loggerenberg** | Data Analyst | Data Science, Beijing Youth Science Gold Medal (Neural Network Optimization) |

### Advisors

| Name | Role | Background |
|------|------|------------|
| **Martin Strydom** | Data Scientist | MSc Chemistry, Data Engineer at Sekura.id, Former Aspen Pharmacare |
| **Donald Philp** | Data Scientist | MSc AI & Digital Health (Westminster), Former COO Rootstock (17 years) |

*Planned additions: Senior Data Scientist (Quant), Junior Data Engineer, Finance Administrator*

---

## SLIDE 4 — Investment Philosophy

### Management drives outcomes. Everything else is derivative.

- Business fundamentals are the *result* of management decisions
- Investment returns follow management quality
- Yet the industry obsesses over the derivatives (financials, price action) while treating the primary driver as "qualitative"

**What if you could score management systematically — and prove it predicts returns?**

**Our approach:**
- Quantitative scoring of leadership qualities and characteristics
- Formula-driven — removes emotional bias from allocation
- Inspired by insurance and banking risk models (actuarial rigor applied to investment)

---

## SLIDE 5 — Investment Model (Scorecard)

### MANAGEMENT SCORECARD

*S&P 500 coverage (~7,500 executives) · SEC EDGAR primary data · LinkedIn & Credit Bureaus in exploration*

| Factor | What it captures |
|--------|------------------|
| **Track Record** | Historical performance at prior companies |
| **Qualifications** | Educational credentials, professional certifications |
| **Shareholding** | Skin in the game — personal capital committed |
| **Incentives** | Compensation structure alignment |
| **Experience** | Years in role, industry tenure |
| **Age** | Career stage, succession risk |
| **Demographics** | Board diversity metrics |
| **Technology Literacy** | Digital transformation capability |

**Scoring logic:**  
Individual executive scores → Weighted by role (CEO weighted higher than independent directors) → Company-level score

---

## SLIDE 6 — Investment Strategy

### First Principles Execution

**What we do:**
- Focus *only* on management — no reliance on company fundamentals or market price data
- Allocate capital systematically to highest-scoring management teams
- Model runs quarterly with annual rebalancing (plus ad-hoc for major executive changes)

**Target performance:**
- BAM Core: S&P 500 + 300 bps (lower active risk)
- BAM Unconstrained: S&P 500 + 1,000 bps (higher active risk)

**Discipline:**
- Benchmark as base — we optimize, not rebuild from scratch
- Active allocation within defined risk parameters
- Unemotional execution — scores determine allocation, not conviction

---

## SLIDE 7 — Data Pipeline

### From filings to scores: deterministic-first architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  DATA SOURCES   │ ──▶ │   EXTRACTION    │ ──▶ │    SCORING      │ ──▶ │   AGGREGATION   │
│                 │     │                 │     │                 │     │                 │
│ • SEC EDGAR     │     │ • LLM parsing   │     │ • Deterministic │     │ • Executive     │
│ • Proxy filings │     │ • NER entities  │     │   rule engine   │     │   weighting     │
│ • 10-K/DEF 14A  │     │ • Structured    │     │ • Scorecard     │     │ • Company-level │
│ • Compensation  │     │   validation    │     │   calculation   │     │   scores        │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
                                                                                 │
        ┌────────────────────────────────────────────────────────────────────────┘
        ▼
┌─────────────────┐     ┌─────────────────┐
│    DATABASE     │ ──▶ │    PORTFOLIO    │
│                 │     │                 │
│ • Point-in-time │     │ • Sector        │
│ • Version       │     │   constraints   │
│   controlled    │     │ • Rebalance     │
└─────────────────┘     └─────────────────┘
```

**Key principle:** LLMs extract from messy filings; deterministic rules score and decide. No black-box portfolio decisions.

---

## SLIDE 8 — Technical Infrastructure

### Built for scale, auditability, and reproducibility

| Layer | Stack |
|-------|-------|
| LLM Extraction | Claude, GPT-4 |
| NLP & Entity Recognition | spaCy, custom NER |
| Core Pipeline | Python, Docker |
| Database | PostgreSQL, Elasticsearch |
| Backtesting | QuantConnect |
| Infrastructure | Containerized, CI/CD |

**Data sources:**

| Source | Status | Coverage |
|--------|--------|----------|
| SEC EDGAR | Live | 100% S&P 500 |
| Proxy statements (DEF 14A) | Live | Compensation, tenure, shareholding |
| 10-K filings | Live | Track record, qualifications |
| LinkedIn | Exploring | Career trajectory validation |
| Credit bureaus | Exploring | Executive financial behavior |

---

## SLIDE 9 — Concept Validation

### 20-year backtest on S&P 500 data

| Metric | Value |
|--------|-------|
| Data analyzed | 3 million pages of company filings |
| Individual scorecards calculated | 130,000 |
| Company scorecards calculated | 10,000 |
| Market coverage | 93% (~800 companies over 20 years) |
| Rebalancing | Annual |

**Results preview:**

|                                                        |                  |
|----------|-------|
| **BAM Core** (top 20% per sector) - _lower risk_       | 4.2% annualized |
| **BAM Unconstrained** (top 20 overall)-  _higher risk_ | 10.1% annualized |

---

## SLIDE 10 — Backtest Methodology

### Point-in-time integrity

- Individual scores calculated annually using only filings available at each calculation date
- No lookahead bias — every backtest decision uses historical information only
- 93% market coverage (~800 companies across 20-year period)

**Validation rigor:**

| Element | Approach |
|---------|----------|
| Platform | QuantConnect (institutional-grade quant infrastructure) |
| Trading costs | 10 bps simulated per rebalance |
| Corporate actions | Adjusted for unbundlings, takeovers, ticker changes, delistings |
| Outlier inspection | Individual score regression to identify and review anomalies |

_Individual score regression utilised to identify and inspect outliers_

---

## SLIDE 11 — Score Distribution

### [CHART PLACEHOLDER]

*Score distribution across S&P 500 universe*

- X-axis: Management Score (0-10)
- Y-axis: Number of companies
- Highlight: Top quintile cutoff for BAM Core selection

---

# BAM CORE

---

## SLIDE 12 — BAM Core Strategy

### BAM Core: Sector-Aligned Alpha

**Strategy:**
- Invests in top 20% of management scores *within each sector* (~85 companies)
- Maintains sector alignment with S&P 500 benchmark
- Lower tracking error, institutional-friendly risk profile

**Characteristics:**

| Attribute | BAM Core |
|-----------|----------|
| Target return | S&P 500 + 300 bps |
| Holdings | ~85 companies |
| Sector weights | Aligned to benchmark |
| Beta | ~1.0 |
| Rebalancing | Quarterly (live) / Annual (backtest) |

---

## SLIDE 13 — BAM Core Metrics

### BAM Core: 20-Year Backtest Results (June 2025)

| Metric | BAM Core | S&P 500 |
|--------|:--------:|:-------:|
| Annualized return | 14.8% | 10.6% |
| Alpha | 4.2% | 0.0% |
| Beta | 1.0 | 1.0 |
| Sortino ratio | 1.1 | 0.8 |
| Monthly std deviation | 4.7% | 4.4% |
| Max drawdown | 47.0% | 51.3% |
| Max quarterly return | 20.7% | 18.3% |
| Min quarterly return | -21.6% | -20.7% |
| Positive quarters | 58 | 58 |
| Negative quarters | 22 | 22 |
| **Dominant quarters** | **49** | **31** |

---

## SLIDE 14 — BAM Core Performance (Year-by-Year)

### BAM Core: Annual Performance

| Year (End June) | BAM Core | S&P 500 | Alpha |
|-----------------|:--------:|:-------:|:-----:|
| 2006 | 15.7% | 8.7% | 7.0% |
| 2007 | 24.4% | 20.0% | 4.4% |
| 2008 | -8.0% | -13.0% | 5.0% |
| 2009 | -19.7% | -25.5% | 5.8% |
| 2010 | 17.2% | 14.5% | 2.7% |
| 2011 | 30.5% | 27.9% | 2.6% |
| 2012 | -3.4% | 6.4% | -9.8% |
| 2013 | 34.5% | 20.0% | 14.5% |
| 2014 | 29.8% | 24.7% | 5.0% |
| 2015 | 15.4% | 7.0% | 8.4% |
| 2016 | 8.1% | 2.8% | 5.3% |
| 2017 | 24.9% | 19.1% | 5.8% |
| 2018 | 26.3% | 14.5% | 11.8% |
| 2019 | 11.2% | 10.1% | 1.1% |
| 2020 | 3.5% | 6.0% | -2.5% |
| 2021 | 60.0% | 42.5% | 17.5% |
| 2022 | -5.0% | -9.8% | 4.8% |
| 2023 | 24.0% | 17.1% | 7.0% |
| 2024 | 16.0% | 25.9% | -9.9% |
| 2025 | 15.0% | 14.4% | 0.7% |

---

## SLIDE 15 — BAM Core Historical Top 10

### Portfolio Evolution: Who the model selected

**BAM CORE Portfolio**

| | **2005** | | | **2015** | | | **2024** | |
| :--- | :--- | :---: | :---: | :--- | :---: | :---: | :--- | :---: |
| **Rank** | **Company** | **Weight** | **Final** | **Company** | **Weight** | **Final** | **Company** | **Weight** |
| 1 | Copart inc | 7.77% | 9.11 | Regeneron pharmaceuticals | 6.14% | 9.91 | Regeneron pharmaceuticals | 8.78% |
| 2 | Mckesson corporation | 6.38% | 9.51 | Mcgraw hill financial inc | 4.90% | 10.18 | Salesforcecom inc | 7.90% |
| 3 | Marsh & mclennan companies | 6.09% | 10.04 | Northrop grumman corp | 4.77% | 7.87 | Intuit inc | 7.10% |
| 4 | Verizon communications inc | 5.75% | 7.13 | Phillips 66 | 4.47% | 9.21 | Raymond james financial | 5.90% |
| 5 | The clorox company | 5.19% | 9.48 | Meta platforms inc | 4.10% | 9.92 | Fortinet inc | 4.34% |
| 6 | Perkinelmer inc | 5.15% | 9.31 | Electronic arts inc | 3.62% | 9.79 | Take-two interactive softw | 4.00% |
| 7 | Prologis inc | 4.41% | 9.72 | The nasdaq omx group inc | 3.43% | 9.83 | Gen digital inc | 3.84% |
| 8 | Franklin resources inc | 3.52% | 9.51 | Intuitive surgical inc | 3.42% | 9.34 | The coca-cola company | 3.67% |
| 9 | Carnival corporation | 3.41% | 9.22 | General electric company | 3.21% | 7.57 | Mohawk industries inc | 2.81% |
| 10 | Nvidia corporation | 3.16% | 10.17 | Monster beverage corp | 2.94% | 9.41 | Nvidia corporation | 2.81% |
| | **Total/Avg Score** | **50.83%** | **9.32** | **Total/Avg Score** | **41.01%** | **9.30** | **Total/Avg Score** | **51.15%** |

**S&P 500 Benchmark**

| | **2005** | | | **2015** | | | **2024** | |
| :--- | :--- | :---: | :---: | :--- | :---: | :---: | :--- | :---: |
| **Rank** | **Company** | **Weight** | **Final** | **Company** | **Weight** | **Final** | **Company** | **Weight** |
| 1 | General Electric | 3.36% | 6.87 | Apple Inc | 3.94% | 7.12 | Microsoft Corp | 7.23% |
| 2 | ExxonMobil | 3.35% | 7.31 | Microsoft Corp | 1.95% | 7.57 | NVIDIA Corp | 6.61% |
| 3 | Microsoft | 2.28% | 7.16 | Exxon Mobil Corporation | 1.90% | 7.22 | Apple Inc | 6.60% |
| 4 | Citigroup | 2.20% | 6.82 | Johnson & Johnson | 1.48% | 7.27 | Amazon.com Inc | 3.85% |
| 5 | Pfizer | 1.88% | 6.28 | General Electric Co | 1.46% | 7.74 | Meta Platforms Inc Class A | 2.40% |
| 6 | Johnson & Johnson | 1.77% | 7.26 | Wells Fargo & Co | 1.44% | 6.71 | Alphabet Inc Class A | 2.33% |
| 7 | Bank of America | 1.68% | 6.13 | JPMorgan Chase & Co | 1.37% | 6.83 | Alphabet Inc Class C | 1.95% |
| 8 | Wal-Mart Stores | 1.48% | 6.43 | Berkshire Hathaway B | 1.35% | 6.55 | Berkshire Hathaway B | 1.60% |
| 9 | Intel | 1.47% | 7.44 | Procter & Gamble Co | 1.16% | 6.94 | Eli Lilly and Co | 1.57% |
| 10 | American International Grp | 1.38% | 6.45 | Pfizer Inc | 1.13% | 7.05 | Broadcom Inc | 1.52% |
| | **Total/Avg Score** | **20.84%** | **6.81** | **Total/Avg Score** | **17.17%** | **7.10** | **Total/Avg Score** | **35.66%** |

*Compare to S&P 500 Top 10 average scores: 6.81 → 7.10 → 7.10*

---

## SLIDE 16 — BAM Core Live Model

### BAM Core: October 2025

**Top 10 Holdings:**

| Nr | BAM CORE TOP 10 WEIGHT | BAM Core | S&P 500 | | Nr | S&P 500 TOP 10 WEIGHT | S&P 500 | BAM Core | | Nr | SECTOR WEIGHT | BAM Core | S&P 500 |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :--- | :---: | :---: |
| 1 | Micron Technology, Inc. | 11.3% | 0.2% | | 1 | NVIDIA Corp | 7.6% | - | | 1 | Information Technology | 33.4% | 33.4% |
| 2 | Hewlett Packard Enterprise | 9.7% | 0.1% | | 2 | Microsoft Corp | 6.9% | - | | 2 | Financials | 14.0% | 14.0% |
| 3 | Apple Inc. | 8.8% | 6.3% | | 3 | Apple Inc | 6.3% | 8.8% | | 3 | Consumer Discretionary | 10.5% | 10.5% |
| 4 | Meta Platforms, Inc. | 7.9% | 2.9% | | 4 | Amazon.com Inc | 3.9% | - | | 4 | Communication Services | 10.0% | 10.0% |
| 5 | General Motors Company | 6.4% | 0.1% | | 5 | Meta Platforms Inc Class A | 2.9% | 7.9% | | 5 | Health Care | 9.2% | 9.2% |
| 6 | Church & Dwight Co., Inc. | 3.2% | 0.0% | | 6 | Broadcom Inc | 2.6% | - | | 6 | Industrials | 8.4% | 8.4% |
| 7 | Fiserv, Inc. | 3.0% | 0.1% | | 7 | Alphabet Inc Class A | 2.3% | - | | 7 | Consumer Staples | 5.2% | 5.2% |
| 8 | American International Group | 3.0% | 0.1% | | 8 | Alphabet Inc Class C | 1.8% | 1.3% | | 8 | Energy | 3.1% | 3.1% |
| 9 | Intuitive Surgical, Inc. | 3.0% | 0.3% | | 9 | Tesla Inc | 1.7% | 0.2% | | 9 | Utilities | 2.4% | 2.4% |
| 10 | Fidelity National Info Services | 2.5% | 0.1% | | 10 | Berkshire Hathaway Inc B | 1.7% | - | | 10 | Real Estate | 2.0% | 2.0% |
| | **Total** | **58.8%** | **10.3%** | | | **Total** | **37.7%** | **18.2%** | | 11 | Materials | 1.9% | 1.9% |

**Live Performance:**

| Quarter | BAM Core | S&P 500 | Alpha |
|---------|:--------:|:-------:|:-----:|
| 2025 Q3 | 9.78% | 8.51% | +1.27% |
| 2025 Q4 (to 26 Nov) | 3.26% | 1.73% | +1.53% |

---

# BAM UNCONSTRAINED

---

## SLIDE 17 — BAM Unconstrained Strategy

### BAM Unconstrained: Concentrated Alpha

**Strategy:**
- Invests in top 20 management scores across entire universe — no sector constraints
- Higher conviction, higher volatility, higher target return
- For investors with appetite for active risk

**Characteristics:**

| Attribute | BAM Unconstrained |
|-----------|-------------------|
| Target return | S&P 500 + 1,000 bps |
| Holdings | ~20 companies |
| Sector weights | Unconstrained |
| Beta | ~1.2 |
| Rebalancing | Quarterly (live) / Annual (backtest) |

---

## SLIDE 18 — BAM Unconstrained Metrics

### BAM Unconstrained: 20-Year Backtest Results

| Metric | BAM UC | S&P 500 |
|--------|:------:|:-------:|
| Annualized return | 20.6% | 10.6% |
| Alpha | 10.1% | 0.0% |
| Beta | 1.2 | 1.0 |
| Sortino ratio | 1.2 | 0.8 |
| Monthly std deviation | 6.1% | 4.4% |
| Max drawdown | 49.2% | 51.3% |
| Max quarterly return | 38.9% | 18.3% |
| Min quarterly return | -29.3% | -20.7% |
| Positive quarters | 59 | 58 |
| Negative quarters | 21 | 22 |
| **Dominant quarters** | **54** | **26** |

---

## SLIDE 19 — BAM Unconstrained Performance (Year-by-Year)

### BAM Unconstrained: Annual Performance

| Year (End June) | BAM UC | S&P 500 | Alpha |
|-----------------|:------:|:-------:|:-----:|
| 2006 | 20.0% | 8.7% | 11.4% |
| 2007 | 30.2% | 20.0% | 10.2% |
| 2008 | -5.6% | -13.1% | 7.5% |
| 2009 | -9.7% | -25.5% | 15.8% |
| 2010 | 16.3% | 14.5% | 1.7% |
| 2011 | 34.2% | 27.9% | 6.3% |
| 2012 | -13.8% | 6.4% | -20.3% |
| 2013 | 40.6% | 20.0% | 20.6% |
| 2014 | 29.2% | 24.7% | 4.4% |
| 2015 | 22.4% | 7.0% | 15.4% |
| 2016 | 11.5% | 2.8% | 8.7% |
| 2017 | 40.1% | 19.1% | 21.0% |
| 2018 | 34.7% | 14.5% | 20.2% |
| 2019 | 36.9% | 10.1% | 26.8% |
| 2020 | 8.6% | 6.0% | 2.6% |
| 2021 | 70.7% | 42.5% | 28.2% |
| 2022 | 7.8% | -9.8% | 17.6% |
| 2023 | 26.1% | 17.1% | 9.0% |
| 2024 | 18.2% | 25.9% | -7.8% |
| 2025 | 24.1% | 14.4% | 9.7% |

---

## SLIDE 20 — BAM Unconstrained Live Model

### BAM Unconstrained: October 2025

**Top 10 Holdings:**

| Nr | BAM Unconstrained Top 10 | BAM UC | S&P 500 | | Nr | S&P 500 Top 10 | S&P 500 | BAM UC | | Nr | Sector Weight | BAM UC | S&P 500 |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :--- | :---: | :---: |
| 1 | General Motors Company | 17.6% | 0.1% | | 1 | NVIDIA Corp | 7.6% | - | | 1 | Information Technology | 51.3% | 33.4% |
| 2 | Micron Technology, Inc. | 8.2% | 0.2% | | 2 | Microsoft Corp | 6.9% | - | | 2 | Consumer Discretionary | 17.6% | 10.5% |
| 3 | Intuitive Surgical, Inc. | 6.7% | 0.3% | | 3 | Apple Inc | 6.3% | 5.0% | | 3 | Health Care | 13.0% | 9.2% |
| 4 | Rockwell Automation, Inc. | 6.0% | 0.1% | | 4 | Amazon.com Inc | 3.9% | - | | 4 | Industrials | 11.2% | 8.4% |
| 5 | Hewlett Packard Enterprise | 6.0% | 0.1% | | 5 | Meta Platforms Inc Class A | 2.9% | 2.9% | | 5 | Consumer Staples | 4.0% | 5.2% |
| 6 | L3Harris Technologies, Inc. | 5.1% | 0.1% | | 6 | Broadcom Inc | 2.6% | - | | 6 | Communication Services | 2.9% | 10.0% |
| 7 | Apple Inc. | 5.0% | 6.3% | | 7 | Alphabet Inc Class A | 2.3% | - | | 7 | Energy | 0.0% | 3.1% |
| 8 | Workday, Inc. | 4.8% | 0.1% | | 8 | Alphabet Inc Class C | 1.8% | - | | 8 | Financials | 0.0% | 14.0% |
| 9 | NXP Semiconductors N.V. | 4.7% | 0.1% | | 9 | Tesla Inc | 1.7% | - | | 9 | Materials | 0.0% | 1.9% |
| 10 | Church & Dwight Co., Inc. | 4.0% | 0.0% | | 10 | Berkshire Hathaway Inc B | 1.7% | - | | 10 | Real Estate | 0.0% | 2.0% |
| | **Total** | **68.11%** | **7.40%** | | | **Total** | **37.7%** | **7.8%** | | 11 | Utilities | 0.0% | 2.4% |

**Live Performance:**

| Quarter | Portfolio | Return | S&P500 Return | Alpha |
| :--- | :--- | :---: | :---: | :---: |
| 2025Q3 | BAM UC | 4.15% | 8.51% | -4.36% |
| 2025Q4 (26_11) | BAM UC | 6.43% | 1.73% | 4.70% |

---

# RISK & PRODUCT

---

## SLIDE 21 — Risk Management

### Disciplined Risk Framework

**Philosophy:**
- Start with benchmark as base — optimize, don't reinvent
- Target alpha while minimizing downside volatility
- Continuous quality control at every pipeline stage

**Controls:**

| Control | Implementation |
|---------|----------------|
| Data quality | High-trust sources only (SEC EDGAR primary) |
| Extraction validation | Structured checks on LLM outputs |
| Scoring audit | Every score traceable to source filing |
| Portfolio constraints | Sector limits (Core), position limits |
| Model refinement | Ongoing backtesting and optimization |

**Quality gates:** Modular process with defined checkpoints — extraction, scoring, aggregation each validated before proceeding.

---

## SLIDE 22 — Initial Product

### BAM Core Fund

| Item | Detail |
|------|--------|
| Investment vehicle | BAM Core (Fund) |
| Net return target | S&P 500 + 300 bps |
| Benchmark | S&P 500 (or equivalent) |
| Management fee | 50 bps (Seed/Institutional) / 100 bps (Retail) |
| Performance fee | 20% of alpha, rolling 12-month |
| Fund structure | CIS South Africa / ICAV Ireland |

---

# THE OPPORTUNITY

---

## SLIDE 23 — Business Opportunity

### Why Now, Why Us

**The opportunity:**
- S&P 500 market cap: $60 trillion
- Passive funds tracking S&P 500: $10 trillion
- Active funds benchmarked to S&P 500: $6 trillion
- Our addressable market: managers seeking systematic alpha

**Our edge:**
- Unconventional approach — not competing on the same signals as everyone else
- Exceptional local talent at global standards, cost-effective base
- Unemotional, rational, relatable — easy to understand, difficult to replicate
- Model exportable to other markets with centralized filings (Japan, China, EU)

---

## SLIDE 24 — Principles & Vision

### Building a Global Quantitative Manager

**Principles:**
- Best people, best technology
- First-principles investment philosophy
- High-quality, alpha-generating products

**Vision:**
- Global product range: 5-10 funds covering major benchmarks
- Client base: Institutional pension funds, sovereign wealth funds
- **Target AUM: $1 billion by 2030**

---

## SLIDE 25 — Business Structure

### Corporate Setup

| Entity | Role |
|--------|------|
| Board Assessment Management (Pty) Ltd | Operating company, IP holder |
| Anomaly Capital (Pty) Ltd | FSP II-A license holder, Johan Barkhuysen (100%) |

**Current shareholders:**
- Anomaly Capital: 95%
- Francois Dercksen: 5%

**License arrangement:** BoardAM utilizes Anomaly's FSP license at cost until sufficient scale for independent license.
**Governance:** Shareholder agreement in place; terms available for review.

---

# THE ASK

---

## SLIDE 26 — Capital Raise

### Investment Opportunity

**Raise:** R10 million capital + R500 million initial AUM commitment

**Terms:**
- 25% equity for R10m capital + R500m AUM commitment
- Ideally 3-5 investors at ~5% each

**Use of funds (two tranches):**

| Tranche | Amount | Timing | Purpose |
|---------|--------|--------|---------|
| First | R5m | January 2026 | Team (2× Data Scientists, Admin), fund setup, operations |
| Second | R5m | ~18 months post-launch | Scale distribution after R500m+ AUM milestone |

**Business model:** Capital-light, cash-generative. First tranche sufficient to reach profitability.

---

## SLIDE 27 — Shareholding

### Ownership Structure

| Shareholder | Pre-Raise | Post-Raise |
|-------------|:---------:|:----------:|
| Johan Barkhuysen | 95% | 70% |
| Francois Dercksen | 5% | 5% |
| Investment Partners | 0% | 25% |
| **Total** | **100%** | **100%** |

---

## SLIDE 28 — Budget

**Budget Summary (R'm)**

| Budget Summary R'm | Q4 25 | Q1 26 | Q2 26 | Q3 26 | Q4 26 | Q1 27 | Q2 27 | Q3 27 | Q4 27 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Seed/Institutional AUM | - | 500 | 763 | 1 032 | 1 307 | 1 590 | 2 630 | 2 946 | 3 269 |
| Retail AUM | - | - | - | 306 | 364 | 423 | 1 434 | 1 719 | 2 012 |
| **Total AUM** | **-** | **500** | **763** | **1 338** | **1 671** | **2 013** | **4 063** | **4 665** | **5 282** |
| | | | | | | | | | |
| **Net Revenue** | **-** | **1.16** | **1.24** | **2.48** | **3.25** | **4.05** | **5.97** | **9.80** | **11.20** |
| | | | | | | | | | |
| **Expenses** | **-** | **2.15** | **2.41** | **2.26** | **2.26** | **2.26** | **2.36** | **2.26** | **2.26** |
| Salaries | - | 1.45 | 1.81 | 1.66 | 1.66 | 1.66 | 1.66 | 1.66 | 1.66 |
| Operations | - | 0.70 | 0.60 | 0.60 | 0.60 | 0.60 | 0.70 | 0.60 | 0.60 |
| | | | | | | | | | |
| **Profit Before Tax** | **-** | **-0.99** | **-1.17** | **0.21** | **0.99** | **1.79** | **3.61** | **7.54** | **8.94** |
| **Cumulative Cash Flow** | **-** | **-0.99** | **-2.16** | **-1.95** | **-0.95** | **0.83** | **4.44** | **11.99** | **20.92** |
| | | | | | | | | | |
| **Profit Before Tax (ex PF)**| **-** | **-1.74** | **-1.92** | **-0.93** | **-0.56** | **-0.17** | **1.23** | **3.60** | **4.52** |
| **Cumulative Cash Flow** | **-** | **-1.74** | **-3.66** | **-4.59** | **-5.15** | **-5.32** | **-4.09** | **-0.50** | **4.02** |

**Assumptions**

| Category | Item | Rate/Value | Note |
| :--- | :--- | :--- | :--- |
| **Market Returns** | BAM | 13% | |
| | S&P500 | 10% | |
| | USD/ZAR | 0% | |
| | Alpha | 3.0% | |
| **Fees** | | **Institutional** | **Retail** |
| | Management Fee | 0.50% | 1.00% |
| | Performance Fee | 20% | 20% |
| **Manco Platform Fee**| | 0.15% | <1000 |
| | | 0.13% | >1000 |
| **Salaries R'mpa** | Data Scientist (Senior) | 1.5 | |
| | Business Development | 1.5 | |
| | Data Scientist (Mid) | 1.0 | |
| | MD | 1.2 | |
| | Execution Dealer | 1.0 | |
| | Administrator | 0.5 | |

---

## SLIDE 29 — Timeline

### Path to Launch

| Milestone | Target |
|-----------|--------|
| First tranche capital (R5m) | January 2026 |
| Shareholder agreements finalized | January–March 2026 |
| Team appointments (2× Data Scientist, Admin) | January–March 2026 |
| Fund vehicle available | 1 February 2026 |
| Fund launch | March 2026 |
| First institutional client | Q2 2026 |
| R500m AUM milestone | Q4 2026 |
| Second tranche capital | Q3 2027 |

---
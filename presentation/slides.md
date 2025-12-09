---
theme: default
layout: intro
background: /img/background.png
highlighter: shiki
lineNumbers: false
info: |
  ## Board Assessment Management
  Pitch Deck
transition: slide-left
title: Board Assessment Management
mdc: true
---
# Board Assessment Management

## Introduction & Capital Raise — December 2025

<p class="text-lg opacity-70 italic mt-8">Quantifying what everyone knows but no one measures</p>

<!-- ==================== SLIDE 2: The Insight ==================== -->
---

# The Insight

## Everyone knows management matters. No one systematically measures it.

- Every investor says "we back great management team"
- No one has a repeatable, quantitative framework to identify them
- We built one, and it generates alpha

<div class="mt-8 p-4 bg-gray-100 rounded border-l-4 border-green-500 dark:bg-gray-800">
  <strong>The gap we exploit:</strong><br>
  Qualitative conviction → Quantitative signal → Systematic allocation
</div>

<!-- ==================== SLIDE 3: Team & Advisors ==================== -->
---

# Team & Advisors

## Core Team

| Name | Role | Background |
|------|------|------------|
| **Johan Barkhuysen** | CEO | CFA, Former Head of Asset Management SA at Stonehage Fleming, Founder/CEO Rootstock (15 years) |
| **Francois Dercksen** | Data Analyst | Actuarial Science, Stellenbosch University |
| **Rohan van Loggerenberg** | Data Analyst | Data Science, Beijing Youth Science Gold Medal (Neural Network Optimization) |

<div class="spacer"></div>

## Advisors

| Name | Role | Background |
|------|------|------------|
| **Martin Strydom** | Data Scientist | MSc Chemistry, Data Engineer at Sekura.id, Former Aspen Pharmacare |
| **Donald Philp** | Data Scientist | MSc AI & Digital Health (Westminster), Former COO Rootstock (17 years) |

<div class="mt-15 text-xs opacity-75">
  <strong>Note:</strong><br>
  Planned additions: Senior Data Scientist (Quant), Junior Data Engineer, Finance Administrator
</div>


<!-- ==================== SLIDE 4: Investment Philosophy ==================== -->
---

# Investment Philosophy

## Management drives outcomes. Everything else is derivative.

- Business fundamentals are the *result* of management decisions
- Investment returns follow management quality
- Yet the industry obsesses over the derivatives (financials, price action) while treating the primary driver as "qualitative"

## What if you could score management systematically.

- Quantitative scoring of leadership qualities and characteristics
- Formula-driven — removes emotional bias from allocation
- Inspired by insurance and banking risk models 

<!-- ==================== SLIDE 5: Investment Model ==================== -->
---
class: table-w-50
---
# Investment Model

## Management Scorcard

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

<div class="mt-22 text-xs opacity-75">
  <strong>Note:</strong><br>
  S&P 500 coverage (~7,500 executives) · SEC EDGAR primary data · LinkedIn & Credit Bureaus in exploration
</div>

<!-- ==================== SLIDE 6: Investment Strategy ==================== -->
---

# Investment Strategy

## First Principles Execution

<style scoped>
p, li { font-size: 0.875rem !important; }
ul { margin-bottom: 1.2rem !important; }  /* Space after bullet list - before next heading */
h3 { margin-top: 0.3rem !important; }     /* Space above subheading */
</style>

### What we do:
- Focus *only* on management — no reliance on company fundamentals or market price data
- Allocate capital systematically to highest-scoring management teams
- Model runs quarterly with quarterly rebalancing (plus ad-hoc for major executive changes)

### Target performance:
- BAM Core: S&P 500 + 300 bps (lower active risk)
- BAM Unconstrained: S&P 500 + 1,000 bps (higher active risk)

### Discipline:
- Benchmark as base — we optimize, not rebuild from scratch
- Active allocation within defined risk parameters
- Unemotional execution — scores determine allocation, not conviction

<!-- ==================== SLIDE 7: Data Pipeline ==================== -->
---

# Data Pipeline


  <PerformanceChart />




<!-- ==================== SLIDE 8: Technical Infrastructure ==================== -->
---

# Technical Infrastructure

## Built for scale, auditability, and reproducibility

<div class="table-sm">

| Layer | Stack |
|-------|-------|
| LLM Extraction | Claude, GPT-4 |
| NLP & Entity Recognition | spaCy, custom NER |
| Core Pipeline | Python, Docker |
| Database | PostgreSQL, Elasticsearch |
| Backtesting | QuantConnect |
| Infrastructure | Containerized, CI/CD |

</div>
<br>

### Data sources:

<div class="table-sm">

| Source | Status | Coverage |
|--------|--------|----------|
| SEC EDGAR | Live | 100% S&P 500 |
| Proxy statements (DEF 14A) | Live | Compensation, tenure, shareholding |
| 10-K filings | Live | Track record, qualifications |
| LinkedIn | Exploring | Career trajectory validation |
| Credit bureaus | Exploring | Executive financial behavior |

</div>

<!-- ==================== SLIDE 9: Concept Validation ==================== -->
---

# Concept Validation

## 20-year backtest on S&P 500 data

| Metric | Value |
|--------|-------|
| Data analyzed | 3 million pages of company filings |
| Individual scorecards calculated | 130,000 |
| Company scorecards calculated | 10,000 |
| Market coverage | 93% (~800 companies over 20 years) |
| Rebalancing | Annual |

### Results preview:

| Strategy | Return |
|----------|-------|
| **BAM Core** (top 20% per sector) - _lower risk_ | 4.2% annualized |
| **BAM Unconstrained** (top 20 overall)-  _higher risk_ | 10.1% annualized |

<!-- ==================== SLIDE 10: Backtest Methodology ==================== -->
---

# Backtest Methodology

## Point-in-time integrity

- Individual scores calculated annually using only filings available at each calculation date
- No lookahead bias — every backtest decision uses historical information only
- 93% market coverage (~800 companies across 20-year period)

### Validation rigor:

| Element | Approach |
|---------|----------|
| Platform | QuantConnect (institutional-grade quant infrastructure) |
| Trading costs | 10 bps simulated per rebalance |
| Corporate actions | Adjusted for unbundlings, takeovers, ticker changes, delistings |
| Outlier inspection | Individual score regression to identify and review anomalies |

<div class="mt-8 text-xs opacity-75">
  <strong>Note:</strong><br>
  Individual score regression utilised to identify and inspect outliers
</div>

<!-- ==================== SLIDE 11: Score Distribution ==================== -->
---

# Score Distribution

## Score distribution across S&P 500 universe

<BamScoreDistributions />

<!-- ==================== SLIDE 12: BAM Core Strategy ==================== -->
---

# BAM Core Strategy

## BAM Core: Sector-Aligned Alpha

### Strategy
- Invests in top 20% of management scores *within each sector* (~85 companies)
- Maintains sector alignment with S&P 500 benchmark
- Lower tracking error, institutional-friendly risk profile

### Characteristics

| Attribute | BAM Core |
|-----------|----------|
| Target return | S&P 500 + 300 bps |
| Holdings | ~85 companies |
| Sector weights | Aligned to benchmark |
| Beta | ~1.0 |
| Rebalancing | Quarterly (live) / Annual (backtest) |

<!-- ==================== SLIDE 13: BAM Core Metrics ==================== -->
---

# BAM Core Metrics

## BAM Core: 20-Year Backtest Results (June 2025)

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

<!-- ==================== SLIDE 14: BAM Core Performance ==================== -->
---

# BAM Core Performance

## BAM Core: Annual Performance

<div class="table-xs">

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

</div>
<!-- ==================== SLIDE 15: BAM Core Historical Top 10 ==================== -->
---

# BAM Core Historical Top 10

<BamHistoricalTable />

<!-- ==================== SLIDE 16: BAM Core Live Model ==================== -->
---

# BAM Core

<br>

### Live Model: October 2025

<BamLiveTable />

<br>

### Live Performance:

<div class="table-xs">

| Quarter | Portfolio | Return | S&P500 Return | Alpha |
| :--- | :--- | :---: | :---: | :---: |
| 2025Q3 | BAM UC | 4.15% | 8.51% | -4.36% |
| 2025Q4 (26_11) | BAM UC | 6.43% | 1.73% | 4.70% |

</div>

<!-- ==================== SLIDE 17: BAM Unconstrained Strategy ==================== -->
---

# BAM Unconstrained Strategy

## BAM Unconstrained: Concentrated Alpha

### Strategy
- Invests in top 20 management scores across entire universe — no sector constraints
- Higher conviction, higher volatility, higher target return
- For investors with appetite for active risk

### Characteristics

| Attribute | BAM Unconstrained |
|-----------|-------------------|
| Target return | S&P 500 + 1,000 bps |
| Holdings | ~20 companies |
| Sector weights | Unconstrained |
| Beta | ~1.2 |
| Rebalancing | Quarterly (live) / Annual (backtest) |

<!-- ==================== SLIDE 18: BAM Unconstrained Metrics ==================== -->
---

# BAM Unconstrained Metrics

## BAM Unconstrained: 20-Year Backtest Results

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

<!-- ==================== SLIDE 19: BAM Unconstrained Performance ==================== -->
---

# BAM Unconstrained Performance

## BAM Unconstrained: Annual Performance

<div class="table-xs">

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

</div>

<!-- ==================== SLIDE 20: BAM Unconstrained Live Model ==================== -->
---

# BAM Unconstrained Live Model

## BAM Unconstrained: October 2025

### Top 10 Holdings:

<BamUnLiveTable />

<br>

### Live Performance:

<div class="table-xs">

| Quarter | Portfolio | Return | S&P500 Return | Alpha |
| :--- | :--- | :---: | :---: | :---: |
| 2025Q3 | BAM UC | 4.15% | 8.51% | -4.36% |
| 2025Q4 (26_11) | BAM UC | 6.43% | 1.73% | 4.70% |

</div>

<!-- ==================== SLIDE 21: Risk Management ==================== -->
---

# Risk Management

## Disciplined Risk Framework

### Philosophy:
- Start with benchmark as base — optimize, don't reinvent
- Target alpha while minimizing downside volatility
- Continuous quality control at every pipeline stage

### Controls:

<div class="table-sm">

| Control | Implementation |
|---------|----------------|
| Data quality | High-trust sources only (SEC EDGAR primary) |
| Extraction validation | Structured checks on LLM outputs |
| Scoring audit | Every score traceable to source filing |
| Portfolio constraints | Sector limits (Core), position limits |
| Model refinement | Ongoing backtesting and optimization |

</div>


<div class="mt-5 text-xs opacity-75">
  <strong>Note:</strong><br>
  Quality gates: Modular process with defined checkpoints — extraction, scoring, aggregation each validated before proceeding.
</div>

<!-- ==================== SLIDE 22: Initial Product ==================== -->
---

# Initial Product

## BAM Core Fund

| Item | Detail |
|------|--------|
| Investment vehicle | BAM Core (Fund) |
| Net return target | S&P 500 + 300 bps |
| Benchmark | S&P 500 (or equivalent) |
| Management fee | 50 bps (Seed/Institutional) / 100 bps (Retail) |
| Performance fee | 20% of alpha, rolling 12-month |
| Fund structure | CIS South Africa / ICAV Ireland |

<!-- ==================== SLIDE 23: Business Opportunity ==================== -->
---

# Business Opportunity

## Why Now, Why Us

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

<!-- ==================== SLIDE 24: Principles & Vision ==================== -->
---

# Principles & Vision

## Building a Global Quantitative Manager

### Principles:
- Best people, best technology
- First-principles investment philosophy
- High-quality, alpha-generating products

### Vision:
- Global product range: 5-10 funds covering major benchmarks
- Client base: Institutional pension funds, sovereign wealth funds
- **Target AUM: $1 billion by 2030**

<!-- ==================== SLIDE 25: Business Structure ==================== -->
---

# Business Structure

## Corporate Setup

| Entity | Role |
|--------|------|
| Board Assessment Management (Pty) Ltd | Operating company, IP holder |
| Anomaly Capital (Pty) Ltd | FSP II-A license holder, Johan Barkhuysen (100%) |

### Current Shareholders:
- Anomaly Capital: 95%
- Francois Dercksen: 5%

<br>

**License arrangement:** BoardAM utilizes Anomaly's FSP license at cost until sufficient scale for independent license.
**Governance:** Shareholder agreement in place; terms available for review.

<!-- ==================== SLIDE 26: Capital Raise ==================== -->
---

# Capital Raise

## Investment Opportunity

### Raise: 
R10 million capital + R500 million initial AUM commitment

### Terms:
- 25% equity for R10m capital + R500m AUM commitment
- Ideally 3-5 investors at ~5% each

### Use of funds (two tranches):

| Tranche | Amount | Timing | Purpose |
|---------|--------|--------|---------|
| First | R5m | January 2026 | Team (2× Data Scientists, Admin), fund setup, operations |
| Second | R5m | ~18 months post-launch | Scale distribution after R500m+ AUM milestone |

**Business model:** Capital-light, cash-generative. First tranche sufficient to reach profitability.

<!-- ==================== SLIDE 27: Shareholding ==================== -->
---

# Shareholding

## Ownership Structure

| Shareholder | Pre-Raise | Post-Raise |
|-------------|:---------:|:----------:|
| Johan Barkhuysen | 95% | 70% |
| Francois Dercksen | 5% | 5% |
| Investment Partners | 0% | 25% |
| **Total** | **100%** | **100%** |

<!-- ==================== SLIDE 28: Budget Summary ==================== -->
---

# Budget

## Budget Summary (R'm)

<BudgetTable />

<!-- ==================== SLIDE 29: Budget Assumptions ==================== -->
---

# Budget

## Assumptions

<div class="table-xs">

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

</div>

<!-- ==================== SLIDE 30: Timeline ==================== -->
---

# Timeline

## Path to Launch

| Milestone | Target |
|-----------|--------|
| First tranche capital (R5m) | January 2026 |
| Shareholder agreements finalized | January–March 2026 |
| Team appointments | January–March 2026 |
| Fund vehicle available | 1 February 2026 |
| Fund launch | March 2026 |
| First institutional client | Q2 2026 |
| R500m AUM milestone | Q4 2026 |
| Second tranche capital | Q3 2027 |

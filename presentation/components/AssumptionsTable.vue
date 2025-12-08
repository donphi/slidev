<template>
<div class="assumptions-table">
<table style="border-collapse: collapse; width: 100%; font-size: 0.45em;">
  <thead>
    <tr>
      <th colspan="4" style="text-align: center; font-weight: bold; border-bottom: 2px solid #5d8392; color: #5d8392; padding: 0.3rem;">ASSUMPTIONS</th>
    </tr>
    <tr style="border-bottom: 1px solid #e0e0e0; color: #666; font-size: 0.9em;">
      <th style="text-align: left; padding: 0.15rem 0.25rem;">Category</th>
      <th style="text-align: left; padding: 0.15rem 0.25rem;">Item</th>
      <th style="text-align: center; padding: 0.15rem 0.25rem;">Rate/Value</th>
      <th style="text-align: left; padding: 0.15rem 0.25rem;">Note</th>
    </tr>
  </thead>
  <tbody>
    <!-- Market Returns Section -->
    <tr>
      <td rowspan="4" style="text-align: left; font-weight: bold; vertical-align: middle; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem; color: #5d8392;">Market Returns</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">BAM</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">13%</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
    </tr>
    <tr style="background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">S&amp;P500</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">10%</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
    </tr>
    <tr>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">USD/ZAR</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0%</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
    </tr>
    <tr style="background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Alpha</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">3.0%</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
    </tr>
    <!-- Spacer row -->
    <tr><td colspan="4" style="height: 8px; border: none;"></td></tr>
    <!-- Fees Section Header -->
    <tr style="border-bottom: 1px solid #e0e0e0; color: #666; font-size: 0.9em;">
      <td style="text-align: left; font-weight: bold; padding: 0.15rem 0.25rem; color: #5d8392;">Fees</td>
      <td style="text-align: left; padding: 0.15rem 0.25rem;"></td>
      <td style="text-align: center; font-weight: bold; padding: 0.15rem 0.25rem;">Institutional</td>
      <td style="text-align: center; font-weight: bold; padding: 0.15rem 0.25rem;">Retail</td>
    </tr>
    <tr>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Management Fee</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.50%</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.00%</td>
    </tr>
    <tr style="background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Performance Fee</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">20%</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">20%</td>
    </tr>
    <!-- Spacer row -->
    <tr><td colspan="4" style="height: 8px; border: none;"></td></tr>
    <!-- Manco Platform Fee Section -->
    <tr>
      <td rowspan="2" style="text-align: left; font-weight: bold; vertical-align: middle; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem; color: #5d8392;">Manco Platform Fee</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.15%</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">&lt;1000</td>
    </tr>
    <tr style="background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.13%</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">&gt;1000</td>
    </tr>
    <!-- Spacer row -->
    <tr><td colspan="4" style="height: 8px; border: none;"></td></tr>
    <!-- Salaries Section -->
    <tr>
      <td rowspan="6" style="text-align: left; font-weight: bold; vertical-align: middle; padding: 0.15rem 0.25rem; color: #5d8392;">Salaries R'mpa</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Data Scientist (Senior)</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.5</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
    </tr>
    <tr style="background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Business Development</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.5</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
    </tr>
    <tr>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Data Scientist (Mid)</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.0</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
    </tr>
    <tr style="background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">MD</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.2</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
    </tr>
    <tr>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Execution Dealer</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.0</td>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;"></td>
    </tr>
    <tr style="background: #f9f9fb;">
      <td style="text-align: left; padding: 0.15rem 0.25rem;">Administrator</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">0.5</td>
      <td style="text-align: left; padding: 0.15rem 0.25rem;"></td>
    </tr>
  </tbody>
</table>
</div>
</template>

<style scoped>
.assumptions-table table {
  font-size: 0.45em;
  width: 100%;
}
.assumptions-table th, .assumptions-table td {
  padding: 0.15rem 0.25rem;
  line-height: 1.1;
}
</style>


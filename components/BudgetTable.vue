<template>
<div class="budget-table">
<table style="border-collapse: collapse; text-align: center; width: 100%; font-size: 0.45em;">
  <thead>
    <tr>
      <th colspan="10" style="text-align: center; font-weight: bold; border-bottom: 2px solid #5d8392; color: #5d8392; padding: 0.3rem;">BUDGET SUMMARY (R'm)</th>
    </tr>
    <tr style="border-bottom: 1px solid #e0e0e0; color: #666; font-size: 0.9em;">
      <th style="text-align: left; padding: 0.15rem 0.25rem;">Budget Summary R'm</th>
      <th style="text-align: center; padding: 0.15rem 0.25rem;">Q4 25</th>
      <th style="text-align: center; padding: 0.15rem 0.25rem;">Q1 26</th>
      <th style="text-align: center; padding: 0.15rem 0.25rem;">Q2 26</th>
      <th style="text-align: center; padding: 0.15rem 0.25rem;">Q3 26</th>
      <th style="text-align: center; padding: 0.15rem 0.25rem;">Q4 26</th>
      <th style="text-align: center; padding: 0.15rem 0.25rem;">Q1 27</th>
      <th style="text-align: center; padding: 0.15rem 0.25rem;">Q2 27</th>
      <th style="text-align: center; padding: 0.15rem 0.25rem;">Q3 27</th>
      <th style="text-align: center; padding: 0.15rem 0.25rem;">Q4 27</th>
    </tr>
  </thead>
  <tbody>
    <!-- AUM Section -->
    <tr>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Seed/Institutional AUM</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">500</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">763</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1 032</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1 307</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1 590</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2 630</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2 946</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">3 269</td>
    </tr>
    <tr style="background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Retail AUM</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">306</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">364</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">423</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1 434</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1 719</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2 012</td>
    </tr>
    <tr style="font-weight: bold; border-top: 2px solid #ccc; background: #f9f9fb;">
      <td style="text-align: left; padding: 0.15rem 0.25rem;">Total AUM</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">500</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">763</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">1 338</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">1 671</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">2 013</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">4 063</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">4 665</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">5 282</td>
    </tr>
    <!-- Spacer row -->
    <tr><td colspan="10" style="height: 8px; border: none;"></td></tr>
    <!-- Revenue Section -->
    <tr style="font-weight: bold; background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Net Revenue</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.16</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.24</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2.48</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">3.25</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">4.05</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">5.97</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">9.80</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">11.20</td>
    </tr>
    <!-- Spacer row -->
    <tr><td colspan="10" style="height: 8px; border: none;"></td></tr>
    <!-- Expenses Section -->
    <tr style="font-weight: bold; background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Expenses</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2.15</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2.41</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2.26</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2.26</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2.26</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2.36</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2.26</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">2.26</td>
    </tr>
    <tr>
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem; padding-left: 0.5rem;">Salaries</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.45</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.81</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.66</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.66</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.66</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.66</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.66</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.66</td>
    </tr>
    <tr style="background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem; padding-left: 0.5rem;">Operations</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.70</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.60</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.60</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.60</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.60</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.70</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.60</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.60</td>
    </tr>
    <!-- Spacer row -->
    <tr><td colspan="10" style="height: 8px; border: none;"></td></tr>
    <!-- Profit Section -->
    <tr style="font-weight: bold; background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Profit Before Tax</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-0.99</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-1.17</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.21</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.99</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.79</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">3.61</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">7.54</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">8.94</td>
    </tr>
    <tr style="font-weight: bold;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Cumulative Cash Flow</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-0.99</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-2.16</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-1.95</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-0.95</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">0.83</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">4.44</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">11.99</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">20.92</td>
    </tr>
    <!-- Spacer row -->
    <tr><td colspan="10" style="height: 8px; border: none;"></td></tr>
    <!-- Ex PF Section -->
    <tr style="font-weight: bold; background: #f9f9fb;">
      <td style="text-align: left; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">Profit Before Tax (ex PF)</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-1.74</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-1.92</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-0.93</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-0.56</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">-0.17</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">1.23</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">3.60</td>
      <td style="text-align: center; border-bottom: 1px solid #e0e0e0; padding: 0.15rem 0.25rem;">4.52</td>
    </tr>
    <tr style="font-weight: bold;">
      <td style="text-align: left; padding: 0.15rem 0.25rem;">Cumulative Cash Flow</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">-</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">-1.74</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">-3.66</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">-4.59</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">-5.15</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">-5.32</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">-4.09</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">-0.50</td>
      <td style="text-align: center; padding: 0.15rem 0.25rem;">4.02</td>
    </tr>
  </tbody>
</table>
</div>
</template>

<style scoped>
.budget-table table {
  font-size: 0.45em;
  width: 100%;
}
.budget-table th, .budget-table td {
  padding: 0.15rem 0.25rem;
  line-height: 1.1;
}
</style>


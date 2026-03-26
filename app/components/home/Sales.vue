<script setup lang="ts">
const rows = [
  { id: '#4596', date: 'Mar 26, 04:53', status: 'paid', email: 'ethan.harris@example.com', amount: '€904.00' },
  { id: '#4599', date: 'Mar 26, 00:53', status: 'paid', email: 'james.anderson@example.com', amount: '€774.00' },
  { id: '#4598', date: 'Mar 25, 17:53', status: 'paid', email: 'james.anderson@example.com', amount: '€335.00' },
  { id: '#4600', date: 'Mar 24, 13:53', status: 'paid', email: 'james.anderson@example.com', amount: '€515.00' },
  { id: '#4597', date: 'Mar 24, 09:53', status: 'refunded', email: 'ethan.harris@example.com', amount: '€502.00' },
  { id: '#4595', date: 'Mar 23, 22:53', status: 'paid', email: 'olivia.martin@example.com', amount: '€649.00' },
  { id: '#4594', date: 'Mar 22, 16:53', status: 'paid', email: 'james.anderson@example.com', amount: '€218.00' },
]
</script>

<template>
  <div class="bg-(--ui-bg-elevated) border border-(--ui-border) rounded-xl overflow-hidden">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-(--ui-border)">
          <th class="px-5 py-3 text-left text-xs font-medium text-(--ui-text-muted) uppercase tracking-wider">ID</th>
          <th class="px-5 py-3 text-left text-xs font-medium text-(--ui-text-muted) uppercase tracking-wider">Date</th>
          <th class="px-5 py-3 text-left text-xs font-medium text-(--ui-text-muted) uppercase tracking-wider">Status</th>
          <th class="px-5 py-3 text-left text-xs font-medium text-(--ui-text-muted) uppercase tracking-wider">Email</th>
          <th class="px-5 py-3 text-right text-xs font-medium text-(--ui-text-muted) uppercase tracking-wider">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.id"
          class="border-b border-(--ui-border) last:border-0 hover:bg-(--ui-bg-accented) transition-colors"
        >
          <td class="px-5 py-3 text-(--ui-text-muted) font-mono text-xs">{{ row.id }}</td>
          <td class="px-5 py-3 text-(--ui-text-toned)">{{ row.date }}</td>
          <td class="px-5 py-3">
            <UBadge
              :label="row.status === 'paid' ? 'Paid' : 'Refunded'"
              :color="row.status === 'paid' ? 'primary' : 'error'"
              variant="subtle"
              size="sm"
            />
          </td>
          <td class="px-5 py-3 text-(--ui-text)">{{ row.email }}</td>
          <td class="px-5 py-3 text-(--ui-text) font-medium text-right">{{ row.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

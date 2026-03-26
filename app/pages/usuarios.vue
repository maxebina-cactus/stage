<template>
  <div class="flex flex-col flex-1 min-h-0">
    <!-- Filter bar — fora da área de scroll -->
    <div class="shrink-0 flex items-center py-[12px] px-6 border-b border-(--ui-border)" style="background-color: #0D1117">
      <DateRangeFilter />
    </div>
    <!-- Conteúdo com scroll próprio -->
    <div class="flex-1 overflow-y-auto" style="background-color: #111827">
      <UsuariosView />
    </div>
  </div>
</template>

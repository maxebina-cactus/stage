<template>
  <div class="flex flex-col flex-1 min-h-0">
    <!-- Filter bar — fora da área de scroll -->
    <div class="shrink-0 flex items-center py-[12px] px-6 border-b border-(--ui-border) bg-(--ui-bg)">
      <DateRangeFilter />
    </div>
    <!-- Conteúdo com scroll próprio -->
    <div class="flex-1 overflow-y-auto">
      <UsuariosView />
    </div>
  </div>
</template>

<template>
  <!-- Break out of main's p-6 so the filter bar reaches edge-to-edge -->
  <div class="-m-6 flex flex-col">
    <!-- Sticky filter bar — sits below the sticky Header (h-16 = top-16) -->
    <div class="sticky top-16 z-20 flex items-center px-6 border-b border-(--ui-border) bg-(--ui-bg-elevated)">
      <DateRangeFilter />
    </div>
    <!-- Page content -->
    <UsuariosView />
  </div>
</template>

<template>
  <div class="min-h-screen bg-(--ui-bg) flex flex-col items-center justify-center px-4 py-12">
    <div class="w-full max-w-sm flex flex-col gap-6">

      <div class="flex items-center justify-between">
        <NuxtLink to="/">
          <AppLogo class="h-6 text-(--ui-text-highlighted)" />
        </NuxtLink>
        <UColorModeButton />
      </div>

      <slot />

      <p class="text-center text-xs text-(--ui-text-toned)">
        © 2026 Stage. Todos os direitos reservados.
      </p>

    </div>
  </div>
</template>

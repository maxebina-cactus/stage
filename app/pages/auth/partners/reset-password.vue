<script setup lang="ts">
definePageMeta({ layout: false })

useSeoMeta({
  title: 'Redefinir senha · Partners',
  description: 'Redefina a senha da sua conta de parceiro Stage',
})

const route = useRoute()

const userName = computed(() => {
  const nome = route.query.nome
  if (typeof nome === 'string' && nome.trim().length > 0) return nome.trim()
  return 'parceiro'
})
</script>

<template>
  <div class="min-h-screen bg-neutral-100 flex items-center justify-center py-10 px-4">
    <div class="w-full max-w-[480px] bg-white rounded-xl overflow-hidden shadow-xl">

      <!-- ── Header ── -->
      <div
        class="relative h-[120px] flex items-center px-6 overflow-hidden"
        style="background: color-mix(in oklab, var(--ui-primary) 38%, #000);"
      >
        <div
          class="absolute inset-0 pointer-events-none"
          style="background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 20px 20px;"
        />
        <div class="absolute -top-16 -right-16 size-48 rounded-full bg-white/5 blur-[60px] pointer-events-none" />
        <NuxtLink to="/" aria-label="Ir para o início" class="relative z-10">
          <AppLogo class="h-7 text-white" />
        </NuxtLink>
      </div>

      <!-- ── Content ── -->
      <div class="flex flex-col items-center gap-6 px-8 py-8">

        <!-- Icon + texts -->
        <div class="flex flex-col items-center gap-4 text-center">
          <div class="size-14 rounded-full bg-neutral-200 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-key-round" class="size-6 text-neutral-600" />
          </div>

          <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold text-(--ui-text) leading-8">
              Redefinir sua senha
            </h1>
            <p class="text-sm text-(--ui-text-muted) leading-5">
              Olá, <span class="font-bold">{{ userName }}</span>,
            </p>
            <p class="text-sm text-(--ui-text-muted) leading-5 mt-2">
              Recebemos uma solicitação para redefinir a senha da sua conta no
              <span class="font-semibold">Stage Partners</span>.
              Se você não fez essa solicitação, pode ignorar este e-mail com segurança.
            </p>
          </div>
        </div>

        <!-- Dashed separator -->
        <div class="w-full border-t border-dashed border-neutral-300" />

        <!-- CTA -->
        <div class="flex justify-center">
          <UButton
            label="Redefinir minha senha"
            color="primary"
            variant="solid"
            trailing-icon="i-lucide-chevron-right"
            to="/auth/partners/new-password"
          />
        </div>

        <!-- Security note -->
        <p class="text-sm text-(--ui-text-muted) leading-5 text-center">
          Este link é válido por 24 horas. Por motivos de segurança, ele só pode ser usado uma vez.
        </p>

      </div>

      <!-- ── Footer ── -->
      <div
        class="flex items-center justify-between px-3 py-2 overflow-hidden"
        style="background: color-mix(in oklab, var(--ui-primary) 38%, #000);"
      >
        <p class="text-xs text-white whitespace-nowrap">
          © 2026 Stage. Todos os direitos reservados.
        </p>
        <NuxtLink
          to="/partners/terms"
          class="text-xs text-white hover:underline whitespace-nowrap"
        >
          Termos de uso
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

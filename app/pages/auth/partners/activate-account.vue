<script setup lang="ts">
definePageMeta({ layout: false })

useSeoMeta({
  title: 'Ativar conta · Partners',
  description: 'Confirme seu e-mail para ativar sua conta de parceiro Stage',
})

const route = useRoute()

const userName = computed(() => {
  const nome = route.query.nome
  if (typeof nome === 'string' && nome.trim().length > 0) return nome.trim()
  return 'parceiro'
})

const toast = useToast()

function handleActivation() {
  toast.add({
    title: 'Bem-vindo ao Stage Partners!',
    description: 'Sua conta foi ativada e você já está conectado. Boas vendas!',
    color: 'success',
  })
  navigateTo('/auth/partners/login?email=afiliado@partners.com&password=Afili@do321')
}
</script>

<template>
  <div class="min-h-screen bg-[#f1f5f9] flex items-center justify-center py-10 px-4">
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
      <div class="flex flex-col gap-6 px-8 py-8">

        <!-- Icon + texts -->
        <div class="flex flex-col items-center gap-4 text-center">
          <div class="size-14 rounded-full bg-[#e2e8f0] flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-trophy" class="size-6 text-[#475569]" />
          </div>

          <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold text-[#0f172b] leading-8">
              Bem-vindo ao Stage Partners! 🚀
            </h1>
            <p class="text-sm text-[#71717b] leading-5">
              Quase lá, <span class="font-bold">{{ userName }}</span>,
            </p>
            <p class="text-sm text-[#71717b] leading-5 mt-2">
              Ficamos felizes em ter você conosco. Para começar a gerenciar suas campanhas e transformar seu tráfego em receita, precisamos apenas que você confirme seu e-mail clicando no botão abaixo.
            </p>
          </div>
        </div>

        <!-- Dashed separator -->
        <div class="border-t border-dashed border-[#cad5e2]" />

        <!-- CTA -->
        <div class="flex justify-center">
          <UButton
            label="Confirmar meu e-mail"
            color="primary"
            variant="solid"
            trailing-icon="i-lucide-chevron-right"
            @click="handleActivation"
          />
        </div>

        <!-- Disclaimer -->
        <p class="text-sm text-[#71717b] leading-5 text-center">
          Se você não criou uma conta no Stage Partners, pode ignorar este e-mail.
        </p>

      </div>

      <!-- ── Footer ── -->
      <div
        class="flex items-center justify-between px-3 py-2 relative overflow-hidden"
        style="background: color-mix(in oklab, var(--ui-primary) 38%, #000);"
      >
        <p class="text-xs text-[#f1f5f9] whitespace-nowrap">
          © 2026 Stage. Todos os direitos reservados.
        </p>
        <NuxtLink
          to="/partners/terms"
          class="text-xs text-[#f1f5f9] hover:underline whitespace-nowrap"
        >
          Termos de uso
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

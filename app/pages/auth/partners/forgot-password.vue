<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth-split' })

useSeoMeta({
  title: 'Recuperar senha · Partners',
  description: 'Envie um link de recuperação para o seu e-mail',
})

const schema = z.object({
  email: z.string({ required_error: 'O e-mail é obrigatório' })
    .min(1, 'O e-mail é obrigatório')
    .email('Digite um e-mail válido'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
})

const isProgramDrawerOpen = useState('programDrawer', () => false)
const isLoading = ref(false)
const enviado = ref(false)
const countdown = ref(0)
let countdownTimer: ReturnType<typeof setInterval> | null = null

function startCountdown() {
  if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null }
  countdown.value = 60
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer!)
      countdownTimer = null
    }
  }, 1000)
}

function resendEmail() {
  startCountdown()
}

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})

async function onSubmit(_event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
  enviado.value = true
  startCountdown()
}

const features = [
  { icon: 'i-lucide-handshake', label: 'Afiliados' },
  { icon: 'i-lucide-gamepad-2', label: 'iGaming' },
  { icon: 'i-lucide-trophy', label: 'Spotsbook' },
]
</script>

<template>
  <div class="grid lg:grid-cols-2 min-h-screen">

    <!-- ── Painel esquerdo — visual/marketing ── -->
    <div
      class="hidden lg:flex flex-col relative overflow-hidden"
      style="background: linear-gradient(145deg, color-mix(in oklab, var(--ui-primary) 2%, var(--ui-bg)) 0%, color-mix(in oklab, var(--ui-primary) 50%, var(--ui-bg)) 70%);"
    >
      <div
        class="absolute inset-0"
        style="background-image: radial-gradient(circle, color-mix(in oklab, var(--ui-bg) 18%, transparent) 1px, transparent 1px); background-size: 28px 28px;"
      />

      <div class="absolute -top-48 -right-48 size-[560px] rounded-full bg-(--ui-bg)/10 blur-[120px] pointer-events-none" />
      <div class="absolute -bottom-48 -left-48 size-[480px] rounded-full bg-(--ui-bg)/5 blur-[100px] pointer-events-none" />

      <div class="relative z-10 flex flex-col justify-between h-full p-12 w-3/4 mx-auto">
        <NuxtLink to="/" aria-label="Ir para o início">
          <AppLogo class="h-7 text-(--ui-text-highlighted)" />
        </NuxtLink>

        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <h1 class="text-4xl font-bold text-(--ui-text-highlighted) leading-tight tracking-tight">
              Transforme seu tráfego em receita no iGaming e apostas esportivas.
            </h1>
            <p class="text-base text-(--ui-text-highlighted) opacity-70 leading-relaxed">
              Plataforma de afiliados com relatórios claros, comissões competitivas e suporte dedicado — para quem leva performance a sério.
            </p>
          </div>

          <ul class="flex flex-col gap-3" role="list" aria-label="Segmentos atendidos">
            <li
              v-for="feature in features"
              :key="feature.label"
              class="flex items-center gap-3"
            >
              <div class="size-8 rounded-(--ui-radius) bg-(--ui-bg)/15 flex items-center justify-center shrink-0" aria-hidden="true">
                <UIcon :name="feature.icon" class="size-6 text-(--ui-text-highlighted)" />
              </div>
              <span class="text-xl font-semibold text-(--ui-text-highlighted)">{{ feature.label }}</span>
            </li>
          </ul>

          <div>
            <UButton
              color="neutral"
              variant="solid"
              label="Saiba mais sobre o programa"
              @click="isProgramDrawerOpen = true"
            />
          </div>
        </div>

        <p class="text-xs text-(--ui-text-highlighted) opacity-40">
          © 2026 Stage. Todos os direitos reservados.
        </p>
      </div>
    </div>

    <!-- ── Painel direito — formulário ── -->
    <div class="relative flex flex-col bg-(--ui-bg)">
      <!-- Color mode toggle + idioma -->
      <div class="absolute top-5 right-5 z-10 flex items-center gap-1">
        <LocaleSwitcher />
        <UColorModeButton size="md" />
      </div>

      <div class="flex flex-col items-center justify-center flex-1 min-h-screen lg:min-h-0 px-6 py-16">
        <div class="w-full max-w-sm flex flex-col gap-7">

          <NuxtLink to="/" class="flex justify-center lg:hidden" aria-label="Ir para o início">
            <AppLogo class="h-6 text-(--ui-text-highlighted)" />
          </NuxtLink>

          <!-- Feedback -->
          <template v-if="enviado">
            <div class="flex flex-col items-center gap-5 text-center">
              <NuxtLink to="/auth/partners/reset-password" class="block cursor-pointer" aria-label="Ver página de redefinição de senha">
                <div class="size-14 rounded-full bg-(--ui-success)/10 flex items-center justify-center">
                  <UIcon name="i-lucide-mail-check" class="size-7 text-(--ui-success)" />
                </div>
              </NuxtLink>
              <div class="flex flex-col gap-1.5">
                <h2 class="text-2xl font-semibold text-(--ui-text-highlighted)">
                  E-mail enviado!
                </h2>
                <p class="text-sm text-(--ui-text-muted) max-w-xs">
                  Enviamos um link de recuperação para <span class="font-medium text-(--ui-text)">{{ state.email }}</span>. Verifique sua caixa de entrada.
                </p>
              </div>
            </div>

            <UButton
              label="Voltar para o login"
              to="/auth/partners/login"
              color="primary"
              block
              icon="i-lucide-arrow-left"
            />

            <p class="text-center text-sm text-(--ui-text-muted)">
              Não recebeu o e-mail?
              <UButton
                :label="countdown > 0 ? `Reenviar em ${countdown}s` : 'Reenviar e-mail'"
                variant="link"
                color="primary"
                class="p-0 text-sm font-medium"
                :disabled="countdown > 0"
                @click.prevent="resendEmail"
              />
            </p>
          </template>

          <!-- Formulário -->
          <template v-else>
            <div class="flex flex-col gap-1">
              <h2 class="text-2xl font-semibold text-(--ui-text-highlighted)">
                Esqueceu a senha?
              </h2>
              <p class="text-sm text-(--ui-text-muted)">
                Informe seu e-mail e enviaremos um link de recuperação
              </p>
            </div>

            <UForm :schema="schema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
              <UFormField name="email" label="E-mail" required>
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="seu@email.com"
                  icon="i-lucide-mail"
                  color="neutral"
                  variant="outline"
                  class="w-full"
                  autocomplete="email"
                />
              </UFormField>

              <UButton
                type="submit"
                label="Enviar link de recuperação"
                color="primary"
                block
                :loading="isLoading"
                :disabled="isLoading"
                class="mt-1"
              />
            </UForm>

            <p class="text-center text-sm text-(--ui-text-muted)">
              Lembrou a senha?
              <NuxtLink to="/auth/partners/login" class="text-(--ui-primary) font-medium hover:underline">
                Voltar para o login
              </NuxtLink>
            </p>
          </template>

        </div>
      </div>
    </div>

  </div>

  <UDrawer
    v-model:open="isProgramDrawerOpen"
    direction="right"
    inset
    :modal="false"
    class="md:max-w-[50vw] w-full"
  >
    <template #title>
      <span class="sr-only">Informações sobre o programa de parceiros</span>
    </template>
    <template #description>
      <span class="sr-only">Detalhes e benefícios do programa de parceiros Stage</span>
    </template>
    <template #content>
      <OrganismsProgramDrawerContent />
    </template>
  </UDrawer>
</template>

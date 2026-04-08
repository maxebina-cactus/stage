<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth-split' })

useSeoMeta({
  title: 'Nova senha · Partners',
  description: 'Crie uma nova senha para sua conta de parceiro',
})

const schema = z.object({
  novaSenha: z.string({ required_error: 'A senha é obrigatória' })
    .min(1, 'A senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  confirmarSenha: z.string({ required_error: 'Confirme sua senha' })
    .min(1, 'Confirme sua senha'),
}).refine(d => d.novaSenha === d.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha'],
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  novaSenha: '',
  confirmarSenha: '',
})

const mostrarSenha = ref(false)
const mostrarConfirmacao = ref(false)
const isLoading = ref(false)
const success = ref(false)
const isNovaSenhaFocused = ref(false)
const isProgramDrawerOpen = useState('programDrawer', () => false)
const isTermsOpen = useState('termsOpen', () => false)

const senhaRules = computed(() => ({
  minChars:  (state.novaSenha?.length ?? 0) >= 8,
  uppercase: /[A-Z]/.test(state.novaSenha ?? ''),
  number:    /[0-9]/.test(state.novaSenha ?? ''),
  special:   /[^A-Za-z0-9]/.test(state.novaSenha ?? ''),
}))

async function onSubmit(_event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
  await navigateTo('/auth/partners/login?msg=reset_success')
}

const features = [
  { icon: 'i-lucide-handshake', label: 'Afiliados' },
  { icon: 'i-lucide-gamepad-2', label: 'iGaming' },
  { icon: 'i-lucide-trophy', label: 'Spotsbook' },
]
</script>

<template>
  <div class="grid lg:grid-cols-2 min-h-screen">

    <!-- ── Left panel — marketing ── -->
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

    <!-- ── Right panel — form ── -->
    <div class="relative flex flex-col bg-(--ui-bg)">
      <div class="absolute top-5 right-5 z-10 flex items-center gap-1">
        <LocaleSwitcher />
        <UColorModeButton size="md" />
      </div>

      <div class="flex flex-col items-center justify-center flex-1 min-h-screen lg:min-h-0 px-6 py-16">
        <div class="w-full max-w-sm flex flex-col gap-7">

          <NuxtLink to="/" class="flex justify-center lg:hidden" aria-label="Ir para o início">
            <AppLogo class="h-6 text-(--ui-text-highlighted)" />
          </NuxtLink>

          <!-- Success -->
          <template v-if="success">
            <div class="flex flex-col items-center gap-5 text-center">
              <div class="size-14 rounded-full bg-(--ui-success)/10 flex items-center justify-center">
                <UIcon name="i-lucide-circle-check" class="size-7 text-(--ui-success)" />
              </div>
              <div class="flex flex-col gap-1.5">
                <h2 class="text-2xl font-semibold text-(--ui-text-highlighted)">
                  Senha redefinida!
                </h2>
                <p class="text-sm text-(--ui-text-muted)">
                  Sua nova senha foi salva com sucesso. Você já pode fazer login.
                </p>
              </div>
            </div>

            <UButton
              label="Ir para o login"
              to="/auth/partners/login"
              color="primary"
              block
              trailing-icon="i-lucide-arrow-right"
            />
          </template>

          <!-- Form -->
          <template v-else>
            <div class="flex flex-col gap-1">
              <h2 class="text-2xl font-semibold text-(--ui-text-highlighted)">
                Crie uma nova senha
              </h2>
              <p class="text-sm text-(--ui-text-muted)">
                Sua nova senha deve ser diferente das utilizadas anteriormente para garantir a segurança da sua conta.
              </p>
            </div>

            <UForm :schema="schema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">

              <UFormField name="novaSenha" label="Nova Senha" required>
                <UPopover
                  :open="isNovaSenhaFocused && (state.novaSenha?.length ?? 0) > 0"
                  mode="hover"
                  :content="{ side: 'bottom', align: 'start', sideOffset: 6 }"
                  :ui="{ content: 'p-3 w-64' }"
                >
                  <UInput
                    v-model="state.novaSenha"
                    :type="mostrarSenha ? 'text' : 'password'"
                    placeholder="••••••••"
                    icon="i-lucide-key-round"
                    color="neutral"
                    variant="outline"
                    class="w-full"
                    autocomplete="new-password"
                    @focus="isNovaSenhaFocused = true"
                    @blur="isNovaSenhaFocused = false"
                  >
                    <template #trailing>
                      <UButton
                        :icon="mostrarSenha ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                        color="neutral"
                        variant="link"
                        size="sm"
                        :aria-label="mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'"
                        @click="mostrarSenha = !mostrarSenha"
                      />
                    </template>
                  </UInput>

                  <template #content>
                    <ul class="flex flex-col gap-1.5" role="list" aria-label="Requisitos da senha">
                      <li
                        v-for="rule in [
                          { key: 'minChars',  label: 'Mínimo 8 caracteres' },
                          { key: 'uppercase', label: '1 letra maiúscula' },
                          { key: 'number',    label: '1 número' },
                          { key: 'special',   label: '1 caractere especial' },
                        ]"
                        :key="rule.key"
                        class="flex items-center gap-2 text-sm"
                      >
                        <UIcon
                          :name="senhaRules[rule.key as keyof typeof senhaRules] ? 'i-lucide-check' : 'i-lucide-x'"
                          :class="senhaRules[rule.key as keyof typeof senhaRules]
                            ? 'text-(--ui-success) size-4 shrink-0'
                            : 'text-(--ui-error) size-4 shrink-0'"
                        />
                        <span
                          :class="senhaRules[rule.key as keyof typeof senhaRules]
                            ? 'text-(--ui-text-muted)'
                            : 'text-(--ui-text)'"
                        >{{ rule.label }}</span>
                      </li>
                    </ul>
                  </template>
                </UPopover>
              </UFormField>

              <UFormField name="confirmarSenha" label="Confirmar Senha" required :validate-on="['blur', 'submit']">
                <UInput
                  v-model="state.confirmarSenha"
                  :type="mostrarConfirmacao ? 'text' : 'password'"
                  placeholder="••••••••"
                  icon="i-lucide-key-round"
                  color="neutral"
                  variant="outline"
                  class="w-full"
                  autocomplete="new-password"
                >
                  <template #trailing>
                    <UButton
                      :icon="mostrarConfirmacao ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                      color="neutral"
                      variant="link"
                      size="sm"
                      :aria-label="mostrarConfirmacao ? 'Ocultar senha' : 'Mostrar senha'"
                      @click="mostrarConfirmacao = !mostrarConfirmacao"
                    />
                  </template>
                </UInput>
              </UFormField>

              <UButton
                type="submit"
                label="Redefinir"
                color="primary"
                block
                :loading="isLoading"
                :disabled="isLoading"
                class="mt-1"
              />

            </UForm>

            <p class="text-center text-xs text-(--ui-text-toned)">
              Ao entrar, você concorda com nossos
              <span
                class="text-(--ui-primary) hover:underline cursor-pointer"
                role="button"
                tabindex="0"
                @click="isTermsOpen = true"
                @keydown.enter="isTermsOpen = true"
              >Termos de Uso</span>.
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

  <TermsModal />
</template>

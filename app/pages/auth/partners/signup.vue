<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth-split' })

useSeoMeta({
  title: 'Criar conta · Partners',
  description: 'Crie sua conta de parceiro para começar',
})

const schema = z.object({
  nome: z.string({ required_error: 'O nome é obrigatório' })
    .min(1, 'O nome é obrigatório')
    .min(2, 'O nome deve ter no mínimo 2 caracteres'),
  email: z.string({ required_error: 'O e-mail é obrigatório' })
    .min(1, 'O e-mail é obrigatório')
    .email('Digite um e-mail válido'),
  cpfCnpj: z.string({ required_error: 'CPF ou CNPJ inválido' })
    .min(1, 'CPF ou CNPJ inválido')
    .refine(
      val => { const d = val.replace(/\D/g, ''); return d.length >= 11 && d.length <= 14 },
      'CPF ou CNPJ inválido',
    ),
  dataNascimento: z.string({ required_error: 'Data de nascimento inválida' })
    .min(1, 'Data de nascimento inválida')
    .refine(val => {
      if (val.length < 10) return false
      const [dia, mes, ano] = val.split('/').map(Number)
      if (!dia || !mes || !ano || ano < 1900 || ano > 9999) return false
      const data = new Date(ano, mes - 1, dia)
      return data.getFullYear() === ano && data.getMonth() === mes - 1 && data.getDate() === dia
    }, 'Data de nascimento inválida')
    .refine(val => {
      const [dia, mes, ano] = val.split('/').map(Number)
      if (!dia || !mes || !ano || ano < 1900) return true
      const nascimento = new Date(ano, mes - 1, dia)
      const hoje = new Date()
      let idade = hoje.getFullYear() - nascimento.getFullYear()
      const m = hoje.getMonth() - nascimento.getMonth()
      if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--
      return idade >= 18
    }, 'Você deve ter no mínimo 18 anos'),
  telefone: z.string({ required_error: 'Digite um telefone válido com DDD' })
    .min(1, 'Digite um telefone válido com DDD')
    .refine(
      val => val.replace(/\D/g, '').length >= 10,
      'Digite um telefone válido com DDD',
    ),
  nacionalidade: z.string({ required_error: 'Selecione sua nacionalidade' })
    .min(1, 'Selecione sua nacionalidade'),
  senha: z.string({ required_error: 'A senha é obrigatória' })
    .min(1, 'A senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  confirmarSenha: z.string({ required_error: 'Confirme sua senha' })
    .min(1, 'Confirme sua senha'),
}).refine(d => d.senha === d.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha'],
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  nome: '',
  email: '',
  cpfCnpj: '',
  dataNascimento: '',
  telefone: '',
  nacionalidade: '',
  senha: '',
  confirmarSenha: '',
})

const mostrarSenha = ref(false)
const mostrarConfirmacao = ref(false)
const isLoading = ref(false)
const registrationSuccess = ref(false)
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

const isSenhaFocused = ref(false)

const senhaRules = computed(() => ({
  minChars:  (state.senha?.length ?? 0) >= 8,
  uppercase: /[A-Z]/.test(state.senha ?? ''),
  number:    /[0-9]/.test(state.senha ?? ''),
  special:   /[^A-Za-z0-9]/.test(state.senha ?? ''),
}))
const isTermsOpen = useState('termsOpen', () => false)
const isProgramDrawerOpen = useState('programDrawer', () => false)

// ── Máscaras ─────────────────────────────────────────────────────────────────

function formatCpfCnpj(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 14)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  if (d.length <= 11) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
  // CNPJ (12–14 dígitos)
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

function formatDataNascimento(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 8)
  if (d.length <= 2) return d
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`
}

function formatTelefone(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function handleCpfCnpjUpdate(val: string) {
  state.cpfCnpj = formatCpfCnpj(val)
}

function handleDataNascimentoUpdate(val: string) {
  state.dataNascimento = formatDataNascimento(val)
}

function handleTelefoneUpdate(val: string) {
  state.telefone = formatTelefone(val)
}

// ── Submit ────────────────────────────────────────────────────────────────────

async function onSubmit(_event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
  registrationSuccess.value = true
  startCountdown()
}

// ── Dados estáticos ───────────────────────────────────────────────────────────

const beneficios = [
  { icon: 'i-lucide-rocket', label: 'Onboarding em menos de 5 minutos' },
  { icon: 'i-lucide-users', label: 'Gestão de times e permissões' },
  { icon: 'i-lucide-trending-up', label: 'Dashboards e metas em tempo real' },
  { icon: 'i-lucide-plug', label: 'Integrações com suas ferramentas' },
]

const opcoesNacionalidade = [
  { label: 'Brasil', value: 'BR' },
  { label: 'Portugal', value: 'PT' },
  { label: 'Estados Unidos', value: 'US' },
  { label: 'Argentina', value: 'AR' },
  { label: 'Espanha', value: 'ES' },
  { label: 'Outro', value: 'outro' },
]

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

      <!-- Dot grid -->
      <div
        class="absolute inset-0"
        style="background-image: radial-gradient(circle, color-mix(in oklab, var(--ui-bg) 18%, transparent) 1px, transparent 1px); background-size: 28px 28px;"
      />

      <!-- Glow blobs -->
      <div class="absolute -top-48 -right-48 size-[560px] rounded-full bg-(--ui-bg)/10 blur-[120px] pointer-events-none" />
      <div class="absolute -bottom-48 -left-48 size-[480px] rounded-full bg-(--ui-bg)/5 blur-[100px] pointer-events-none" />

      <!-- Conteúdo -->
      <div class="relative z-10 flex flex-col justify-between h-full p-12 w-3/4 mx-auto">

        <!-- Logo -->
        <NuxtLink to="/" aria-label="Ir para o início">
          <AppLogo class="h-7 text-(--ui-text-highlighted)" />
        </NuxtLink>

        <!-- Corpo central -->
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

        <!-- Rodapé -->
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

      <!-- Formulário centralizado -->
      <div class="flex flex-col items-center justify-center flex-1 min-h-screen lg:min-h-0 px-6 py-16">
        <div class="w-full max-w-sm flex flex-col gap-7">

          <!-- Logo (mobile only) -->
          <NuxtLink to="/" class="flex justify-center lg:hidden" aria-label="Ir para o início">
            <AppLogo class="h-6 text-(--ui-text-highlighted)" />
          </NuxtLink>

          <!-- Success view -->
          <template v-if="registrationSuccess">
            <div class="flex flex-col items-center gap-5 text-center">
              <NuxtLink to="/auth/partners/activate-account" class="block cursor-pointer" aria-label="Ver página de ativação de conta">
                <div class="size-14 rounded-full bg-(--ui-success)/10 flex items-center justify-center">
                  <UIcon name="i-lucide-mail" class="size-7 text-(--ui-success)" />
                </div>
              </NuxtLink>
              <div class="flex flex-col gap-1.5">
                <h2 class="text-2xl font-semibold text-(--ui-text-highlighted)">
                  Verifique seu e-mail
                </h2>
                <p class="text-sm text-(--ui-text-muted) max-w-xs">
                  Enviamos um link de ativação para <span class="font-medium text-(--ui-text)">{{ state.email }}</span>. Verifique sua caixa de entrada.
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

          <!-- Form -->
          <template v-else>
          <!-- Header -->
          <div class="flex flex-col gap-1">
            <h2 class="text-2xl font-semibold text-(--ui-text-highlighted)">
              Criar conta
            </h2>
            <p class="text-sm text-(--ui-text-muted)">
              Preencha os dados para criar sua conta de parceiro
            </p>
          </div>

          <!-- Form -->
          <UForm :schema="schema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">

            <!-- Linha inteira -->
            <div class="grid grid-cols-1 gap-4">
              <UFormField name="nome" label="Nome completo" required>
                <UInput
                  v-model="state.nome"
                  type="text"
                  placeholder="Seu nome"
                  icon="i-lucide-user"
                  color="neutral"
                  variant="outline"
                  class="w-full"
                  autocomplete="name"
                />
              </UFormField>

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

              <UFormField name="cpfCnpj" label="CPF / CNPJ" required>
                <UInput
                  :model-value="state.cpfCnpj"
                  type="text"
                  inputmode="numeric"
                  placeholder="000.000.000-00 ou 00.000.000/0001-00"
                  icon="i-lucide-id-card"
                  color="neutral"
                  variant="outline"
                  class="w-full"
                  autocomplete="off"
                  @update:model-value="handleCpfCnpjUpdate"
                />
              </UFormField>

              <UFormField name="nacionalidade" label="Nacionalidade" required>
                <USelect
                  v-model="state.nacionalidade"
                  :items="opcoesNacionalidade"
                  placeholder="Selecione sua nacionalidade"
                  leading-icon="i-lucide-globe"
                  color="neutral"
                  variant="outline"
                  class="w-full"
                />
              </UFormField>
            </div>

            <!-- Duas colunas: Data de nascimento | Telefone/WhatsApp -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField name="dataNascimento" label="Data de nascimento" required>
                <UInput
                  :model-value="state.dataNascimento"
                  type="text"
                  inputmode="numeric"
                  placeholder="DD/MM/AAAA"
                  icon="i-lucide-calendar"
                  color="neutral"
                  variant="outline"
                  class="w-full"
                  autocomplete="bday"
                  @update:model-value="handleDataNascimentoUpdate"
                />
              </UFormField>

              <UFormField name="telefone" label="Telefone / WhatsApp" required>
                <UInput
                  :model-value="state.telefone"
                  type="text"
                  inputmode="tel"
                  placeholder="(00) 00000-0000"
                  icon="i-lucide-phone"
                  color="neutral"
                  variant="outline"
                  class="w-full"
                  autocomplete="tel"
                  @update:model-value="handleTelefoneUpdate"
                />
              </UFormField>
            </div>

            <!-- Duas colunas: Senha | Confirmar senha -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField name="senha" label="Senha" required>
                <UPopover
                  :open="isSenhaFocused && (state.senha?.length ?? 0) > 0"
                  mode="hover"
                  :content="{ side: 'bottom', align: 'start', sideOffset: 6 }"
                  :ui="{ content: 'p-3 w-64' }"
                >
                  <UInput
                    v-model="state.senha"
                    :type="mostrarSenha ? 'text' : 'password'"
                    placeholder="••••••••"
                    icon="i-lucide-key-round"
                    color="neutral"
                    variant="outline"
                    class="w-full"
                    autocomplete="new-password"
                    @focus="isSenhaFocused = true"
                    @blur="isSenhaFocused = false"
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

              <UFormField name="confirmarSenha" label="Confirmar senha" required :validate-on="['blur', 'submit']">
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
            </div>

            <UButton
              type="submit"
              label="Criar conta"
              color="primary"
              block
              :loading="isLoading"
              :disabled="isLoading"
              class="mt-1"
            />

          </UForm>

          <!-- Link login -->
          <p class="text-center text-sm text-(--ui-text-muted)">
            Já tem uma conta?
            <NuxtLink to="/auth/partners/login" class="text-(--ui-primary) font-medium hover:underline">
              Entrar
            </NuxtLink>
          </p>

          <!-- Terms -->
          <p class="text-center text-xs text-(--ui-text-toned)">
            Ao criar uma conta, você concorda com nossos
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

  <TermsModal />

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

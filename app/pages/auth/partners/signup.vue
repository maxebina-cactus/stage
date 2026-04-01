<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth-split' })

useSeoMeta({
  title: 'Criar conta · Partners',
  description: 'Crie sua conta de parceiro para começar',
})

const schema = z.object({
  nome: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(8, 'Mínimo de 8 caracteres'),
  confirmarSenha: z.string(),
}).refine(d => d.senha === d.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha'],
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  nome: undefined,
  email: undefined,
  senha: undefined,
  confirmarSenha: undefined,
})

const mostrarSenha = ref(false)
const mostrarConfirmacao = ref(false)
const carregando = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  carregando.value = true
  // TODO: integrar com API de autenticação
  console.log('Signup', event.data)
  carregando.value = false
}

const beneficios = [
  { icon: 'i-lucide-rocket', label: 'Onboarding em menos de 5 minutos' },
  { icon: 'i-lucide-users', label: 'Gestão de times e permissões' },
  { icon: 'i-lucide-trending-up', label: 'Dashboards e metas em tempo real' },
  { icon: 'i-lucide-plug', label: 'Integrações com suas ferramentas' },
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
            <h1 class="text-[2.75rem] font-bold text-(--ui-text-highlighted) leading-[1.15] tracking-tight">
              Comece hoje<br />sem custo
            </h1>
            <p class="text-[1.0625rem] text-(--ui-text-highlighted) opacity-70 max-w-xs leading-relaxed">
              Crie sua conta de parceiro e tenha acesso completo à plataforma em instantes.
            </p>
          </div>

          <ul class="flex flex-col gap-3">
            <li
              v-for="beneficio in beneficios"
              :key="beneficio.label"
              class="flex items-center gap-3"
            >
              <div class="size-8 rounded-lg bg-(--ui-bg)/15 flex items-center justify-center shrink-0">
                <UIcon :name="beneficio.icon" class="size-4 text-(--ui-text-highlighted)" />
              </div>
              <span class="text-sm font-medium text-(--ui-text-highlighted)">{{ beneficio.label }}</span>
            </li>
          </ul>
        </div>

        <!-- Rodapé -->
        <p class="text-xs text-(--ui-text-highlighted) opacity-40">
          © 2026 Stage. Todos os direitos reservados.
        </p>

      </div>
    </div>

    <!-- ── Painel direito — formulário ── -->
    <div class="relative flex flex-col bg-(--ui-bg)">

      <!-- Color mode toggle -->
      <div class="absolute top-5 right-5 z-10">
        <UColorModeButton />
      </div>

      <!-- Formulário centralizado -->
      <div class="flex flex-col items-center justify-center flex-1 min-h-screen lg:min-h-0 px-6 py-16">
        <div class="w-full max-w-sm flex flex-col gap-7">

          <!-- Logo (mobile only) -->
          <NuxtLink to="/" class="flex justify-center lg:hidden" aria-label="Ir para o início">
            <AppLogo class="h-6 text-(--ui-text-highlighted)" />
          </NuxtLink>

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

            <UFormField name="senha" label="Senha" required>
              <UInput
                v-model="state.senha"
                :type="mostrarSenha ? 'text' : 'password'"
                placeholder="••••••••"
                icon="i-lucide-key-round"
                color="neutral"
                variant="outline"
                class="w-full"
                autocomplete="new-password"
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
            </UFormField>

            <UFormField name="confirmarSenha" label="Confirmar senha" required>
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
              label="Criar conta"
              color="primary"
              block
              :loading="carregando"
              class="mt-1"
            />

          </UForm>

          <!-- Divider -->
          <div class="flex items-center gap-3">
            <div class="flex-1 h-px bg-(--ui-border)" />
            <span class="text-xs text-(--ui-text-muted) shrink-0">ou continue com</span>
            <div class="flex-1 h-px bg-(--ui-border)" />
          </div>

          <!-- OAuth -->
          <div class="flex gap-3">
            <UButton label="Google" icon="i-simple-icons-google" color="neutral" variant="outline" block />
            <UButton label="GitHub" icon="i-simple-icons-github" color="neutral" variant="outline" block />
          </div>

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
            <NuxtLink to="/" class="text-(--ui-primary) hover:underline">Termos de Uso</NuxtLink>.
          </p>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth-split' })

useSeoMeta({
  title: 'Entrar · Partners',
  description: 'Acesse sua conta de parceiro',
})

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(8, 'Mínimo de 8 caracteres'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  senha: undefined,
})

const mostrarSenha = ref(false)
const carregando = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  carregando.value = true
  // TODO: integrar com API de autenticação
  console.log('Login', event.data)
  carregando.value = false
}

const features = [
  { icon: 'i-lucide-bar-chart-2', label: 'Relatórios em tempo real' },
  { icon: 'i-lucide-zap', label: 'Gestão de campanhas integrada' },
  { icon: 'i-lucide-shield-check', label: 'Ambiente seguro e auditável' },
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
              Plataforma<br />Partners
            </h1>
            <p class="text-[1.0625rem] text-(--ui-text-highlighted) opacity-70 max-w-xs leading-relaxed">
              Gerencie campanhas, acompanhe resultados e integre seus sistemas em um ambiente unificado.
            </p>
          </div>

          <ul class="flex flex-col gap-3">
            <li
              v-for="feature in features"
              :key="feature.label"
              class="flex items-center gap-3"
            >
              <div class="size-8 rounded-lg bg-(--ui-bg)/15 flex items-center justify-center shrink-0">
                <UIcon :name="feature.icon" class="size-4 text-(--ui-text-highlighted)" />
              </div>
              <span class="text-sm font-medium text-(--ui-text-highlighted)">{{ feature.label }}</span>
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
              Bem-vindo de volta
            </h2>
            <p class="text-sm text-(--ui-text-muted)">
              Acesse sua conta de parceiro para continuar
            </p>
          </div>

          <!-- Form -->
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

            <UFormField name="senha" label="Senha" required>
              <template #hint>
                <NuxtLink
                  to="/auth/partners/forgot-password"
                  class="text-xs text-(--ui-primary) hover:underline"
                >
                  Esqueceu a senha?
                </NuxtLink>
              </template>
              <UInput
                v-model="state.senha"
                :type="mostrarSenha ? 'text' : 'password'"
                placeholder="••••••••"
                icon="i-lucide-key-round"
                color="neutral"
                variant="outline"
                class="w-full"
                autocomplete="current-password"
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

            <UButton
              type="submit"
              label="Entrar"
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

          <!-- Link signup -->
          <p class="text-center text-sm text-(--ui-text-muted)">
            Não tem uma conta?
            <NuxtLink to="/auth/partners/signup" class="text-(--ui-primary) font-medium hover:underline">
              Criar conta
            </NuxtLink>
          </p>

          <!-- Terms -->
          <p class="text-center text-xs text-(--ui-text-toned)">
            Ao entrar, você concorda com nossos
            <NuxtLink to="/" class="text-(--ui-primary) hover:underline">Termos de Uso</NuxtLink>.
          </p>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth-split' })

useSeoMeta({
  title: 'Entrar · Partners',
  description: 'Acesse sua conta de parceiro',
})

const schema = z.object({
  email: z.string({ required_error: 'O e-mail é obrigatório' })
    .min(1, 'O e-mail é obrigatório')
    .email('Digite um e-mail válido'),
  senha: z.string({ required_error: 'A senha é obrigatória' })
    .min(1, 'A senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type Schema = z.output<typeof schema>

const mockUsers = [
  { email: 'gestor@partners.com',    password: 'Ges@tor123',      name: 'Gestor',        role: 'gestor'        },
  { email: 'afiliado@partners.com',  password: 'Afili@do321',     name: 'Afiliado',      role: 'afiliado'      },
  { email: 'admin@partners.com',     password: 'Admin@Master789', name: 'Admin Master',  role: 'admin-master'  },
]

const authUser = useState('authUser', () => null)

const state = reactive<Partial<Schema>>({
  email: '',
  senha: '',
})

const mostrarSenha = ref(false)
const isLoading = ref(false)
const loginError = ref('')
const isProgramDrawerOpen = useState('programDrawer', () => false)

const route = useRoute()
const router = useRouter()
const toast = useToast()

const toastMessages: Record<string, Parameters<typeof toast.add>[0]> = {
  reset_success: {
    title: 'Senha redefinida!',
    description: 'Sua nova senha já está ativa. Você pode acessar sua conta agora.',
    icon: 'i-lucide-circle-check',
    color: 'success',
  },
  activation_success: {
    title: 'E-mail confirmado!',
    description: 'Sua conta foi ativada. Agora é só fazer o login.',
    icon: 'i-lucide-badge-check',
    color: 'success',
  },
}

onMounted(async () => {
  const config = toastMessages[route.query.msg as string]
  if (config) {
    toast.add(config)
    router.replace({ query: {} })
  }

  const emailParam = route.query.email as string
  const passwordParam = route.query.password as string
  if (emailParam && passwordParam) {
    state.email = emailParam
    state.senha = passwordParam
    router.replace({ query: {} })
    await nextTick()
    await onSubmit({ data: { email: emailParam, senha: passwordParam } } as FormSubmitEvent<Schema>)
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  loginError.value = ''

  await new Promise(resolve => setTimeout(resolve, 2000))

  const user = mockUsers.find(
    u => u.email === event.data.email && u.password === event.data.senha,
  )

  if (!user) {
    loginError.value = 'E-mail ou senha incorretos. Verifique seus dados e tente novamente.'
    isLoading.value = false
    return
  }

  authUser.value = user
  const gestorRoles = ['gestor', 'admin-master']
  if (gestorRoles.includes(user.role)) {
    await navigateTo('/partners/dashboard/gestor')
  } else if (user.role === 'afiliado') {
    await navigateTo('/partners/dashboard/afiliados')
  } else {
    await navigateTo('/partners')
  }
}

const features = [
  { icon: 'i-lucide-handshake', label: 'Afiliados' },
  { icon: 'i-lucide-gamepad-2', label: 'iGaming' },
  { icon: 'i-lucide-trophy', label: 'Spotsbook' },
]
</script>

<template>
  <div class="grid lg:grid-cols-2 min-h-screen">

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

          <div class="flex justify-center lg:hidden">
            <UButton
              color="neutral"
              variant="ghost"
              label="Saiba mais sobre o programa"
              icon="i-lucide-info"
              @click="isProgramDrawerOpen = true"
            />
          </div>

          <div class="flex flex-col gap-1">
            <h2 class="text-2xl font-semibold text-(--ui-text-highlighted)">
              Bem-vindo de volta
            </h2>
            <p class="text-sm text-(--ui-text-muted)">
              Acesse sua conta de parceiro para continuar
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

            <UAlert
              v-if="loginError"
              color="error"
              variant="soft"
              icon="i-lucide-circle-alert"
              :description="loginError"
            />

            <UButton
              type="submit"
              label="Entrar"
              color="primary"
              block
              :loading="isLoading"
              :disabled="isLoading"
              class="mt-1"
            />

          </UForm>

          <p class="text-center text-sm text-(--ui-text-muted)">
            Não tem uma conta?
            <NuxtLink to="/auth/partners/signup" class="text-(--ui-primary) font-medium hover:underline">
              Criar conta
            </NuxtLink>
          </p>

          <p class="text-center text-xs text-(--ui-text-muted)">
            Ao entrar, você concorda com nossos
            <span 
              class="text-(--ui-primary) font-medium hover:underline cursor-pointer"
              @click="useState('termsOpen').value = true"
            >
              Termos de Uso
            </span>.
          </p>

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
    <template #content>
      <OrganismsProgramDrawerContent />
    </template>
  </UDrawer>
</template>
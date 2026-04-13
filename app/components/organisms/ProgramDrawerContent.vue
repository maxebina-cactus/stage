<script setup lang="ts">
// Acessamos o estado global para fechar o drawer
const isProgramDrawerOpen = useState('programDrawer')
</script>

<template>
  <div class="relative p-8 flex flex-col h-screen max-h-screen text-(--ui-text) overflow-hidden" tabindex="-1" autofocus>
    
    <div class="absolute top-6 right-6 z-10">
      <UButton
        icon="i-lucide-x"
        color="neutral"
        variant="ghost"
        class="rounded-full"
        aria-label="Fechar"
        @click="isProgramDrawerOpen = false"
      />
    </div>

    <header class="flex flex-col gap-3 mt-8 mb-8 shrink-0">
      <h2 class="text-3xl font-bold text-(--ui-text-highlighted) leading-tight">
        Transforme sua influência em um negócio lucrativo.
      </h2>
      <p class="opacity-80 text-lg">
        O Programa de Parceiros da Stage foi desenvolvido para quem busca alta performance no mercado de iGaming.
      </p>
    </header>

    <div class="flex-1 justify-center overflow-y-auto pr-2 flex flex-col gap-8 scrollbar-thin scrollbar-thumb-(--ui-primary)">

      <section class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <div class="w-1 self-stretch rounded-sm bg-(--ui-primary) shrink-0" />
          <h2 class="text-xl font-semibold text-(--ui-text-muted) uppercase tracking-wider whitespace-nowrap shrink-0">
            Por que ser um parceiro?
          </h2>
          <div class="flex-1 h-px bg-(--ui-border)" />
        </div>
        <ul class="flex flex-col gap-3 opacity-90">
          <li><span class="font-bold text-(--ui-text-highlighted)">Comissões Agressivas:</span> Modelos de CPA, RevShare ou Híbrido adaptados ao seu volume.</li>
          <li><span class="font-bold text-(--ui-text-highlighted)">Pagamentos Pontuais:</span> Receba suas comissões com agilidade e total transparência.</li>
          <li><span class="font-bold text-(--ui-text-highlighted)">Relatórios em Tempo Real:</span> Dashboard exclusivo com métricas detalhadas.</li>
          <li><span class="font-bold text-(--ui-text-highlighted)">Suporte VIP:</span> Gerentes de conta dedicados para sua otimização.</li>
        </ul>
      </section>

      <section class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <div class="w-1 self-stretch rounded-sm bg-(--ui-primary) shrink-0" />
          <h2 class="text-xl font-semibold text-(--ui-text-muted) uppercase tracking-wider whitespace-nowrap shrink-0">
            Como funciona?
          </h2>
          <div class="flex-1 h-px bg-(--ui-border)" />
        </div>
        <div class="grid grid-cols-1 gap-3 opacity-90 border-l-2 border-(--ui-border) pl-4">
          <p><span class="font-bold text-(--ui-text-highlighted)">1. Cadastre-se:</span> Crie sua conta de parceiro em poucos minutos.</p>
          <p><span class="font-bold text-(--ui-text-highlighted)">2. Divulgue:</span> Use seus links exclusivos e materiais personalizados.</p>
          <p><span class="font-bold text-(--ui-text-highlighted)">3. Converta:</span> Acompanhe cada novo jogador indicado.</p>
          <p><span class="font-bold text-(--ui-text-highlighted)">4. Lucre:</span> Ganhe comissões sobre a atividade dos seus indicados.</p>
        </div>
      </section>

      <footer class="pt-6 border-t border-(--ui-border) mb-4">
        <div class="flex items-center gap-2 py-2">
          <div class="w-1 self-stretch rounded-sm bg-(--ui-primary) shrink-0" />
          <h2 class="text-xl font-semibold text-(--ui-text-muted) uppercase tracking-wider whitespace-nowrap shrink-0">
            Pronto para começar?
          </h2>
          <div class="flex-1 h-px bg-(--ui-border)" />
        </div>
        <p class="opacity-80">
          Finalize seu 
          <NuxtLink 
            to="/auth/partners/signup" 
            class="text-(--ui-primary) font-medium hover:underline cursor-pointer"
            @click="isProgramDrawerOpen = false"
          >
            cadastro
          </NuxtLink> 
          agora e tenha acesso imediato ao nosso portal de afiliados.
        </p>
      </footer>
    </div>
  </div>
</template>
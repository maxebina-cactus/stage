<template>
  <div class="flex flex-col gap-8">

    <!-- Cabeçalho -->
    <div class="flex flex-col gap-2 pb-6 border-b border-(--ui-border)">
      <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
        Termos de Uso
      </h1>
      <p class="text-sm text-(--ui-text-muted)">
        Última atualização: 1 de janeiro de 2026
      </p>
    </div>

    <!-- Seções -->
    <div class="flex flex-col gap-10 text-sm leading-relaxed text-(--ui-text-muted) pb-12">
      
      <section class="flex flex-col gap-4">
        <h4 class="font-bold text-(--ui-text-highlighted) text-base uppercase tracking-wider">
          01. Aceitação e Elegibilidade
        </h4>
        <p>
          Ao acessar o ecossistema <strong>Stage Partners</strong>, você declara ser representante legal ou pessoa autorizada pela sua organização. Este ambiente é restrito a parceiros comerciais com contrato ativo. O uso indevido das credenciais pode resultar na suspensão imediata do acesso sem aviso prévio.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h4 class="font-bold text-(--ui-text-highlighted) text-base uppercase tracking-wider">
          02. Propriedade Intelectual e Sigilo
        </h4>
        <p>
          Todos os dados de performance, estratégias de marketing, tabelas de comissionamento e materiais criativos disponibilizados são de propriedade exclusiva da <strong>Stage</strong>. 
        </p>
        <ul class="list-disc pl-5 flex flex-col gap-2">
          <li>É proibida a reprodução total ou parcial de métricas para terceiros.</li>
          <li>Dados de usuários finais acessados via API devem ser tratados com sigilo absoluto.</li>
          <li>O parceiro não deve utilizar a marca Stage de forma que sugira vínculo empregatício.</li>
        </ul>
      </section>

      <section class="flex flex-col gap-4">
        <h4 class="font-bold text-(--ui-text-highlighted) text-base uppercase tracking-wider">
          03. Proteção de Dados (LGPD)
        </h4>
        <p>
          Operamos sob os mais altos padrões de segurança. O parceiro compromete-se a:
        </p>
        <div class="bg-(--ui-bg-elevated) p-4 rounded-lg border border-(--ui-border) italic">
          "Manter a integridade dos dados coletados, utilizando-os apenas para as finalidades previstas em contrato, respeitando os direitos dos titulares previstos na Lei Geral de Proteção de Dados (LGPD)."
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h4 class="font-bold text-(--ui-text-highlighted) text-base uppercase tracking-wider">
          04. Auditoria de Resultados
        </h4>
        <p>
          A Stage reserva-se o direito de auditar cliques, conversões e leads gerados através da plataforma. Caso seja identificada fraude ou tráfego inválido, as comissões correspondentes serão estornadas e o contrato de parceria poderá ser rescindido.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h4 class="font-bold text-(--ui-text-highlighted) text-base uppercase tracking-wider">
          05. Modificações nos Termos
        </h4>
        <p>
          Podemos atualizar estes termos para refletir mudanças legais ou operacionais. A data da última atualização estará sempre visível no cabeçalho desta janela. O uso continuado da plataforma após alterações constitui aceitação dos novos termos.
        </p>
      </section>

      <div class="pt-6 border-t border-(--ui-border) text-xs opacity-60">
        Dúvidas sobre conformidade? Entre em contato com nosso DPO em: 
        <a href="mailto:legal@stage.com" class="text-(--ui-primary) underline">legal@stage.com</a>
      </div>

    </div>

    <!-- Rodapé -->
    <div class="pt-6 border-t border-(--ui-border)">
      <p class="text-xs text-(--ui-text-muted)">
        © 2026 Stage. Todos os direitos reservados.
      </p>
    </div>

  </div>
</template>

/**
 * pt.ts: Portuguese. Translated from en.ts; shape: see ./types.ts.
 * Keep every key; translate values only. Metric and stat values use Brazilian number formatting (1.790, 5,0, $50 mil).
 */
import type { LocaleBundle } from './types';

export const pt: LocaleBundle = {
  projects: {
    'coach-luki': {
      desc: 'Site de personal training focado em conversão para o principal personal trainer vegano de Berlim.',
      challenge: 'Luke Satterly (Coach Luki) é um dos personal trainers mais dedicados de Berlim. Atleta vegano que treina clientes no Holmes Place e no John Reed, ele precisava de um site à altura da sua energia: ousado, focado em resultados e construído para converter. O objetivo era simples. Alguém chega ao site, entende exatamente o que o Luki faz, vê as provas e agenda uma conversa. Sem enrolação. Sem confusão. Só resultados.',
      solution: 'Projetamos um site com a conversão em primeiro lugar, onde cada seção leva a um único objetivo: agendar uma consulta gratuita. A integração de pagamentos com Stripe permite que os clientes comprem pacotes de sessões diretamente, sem nenhum atrito. O SEO local para Berlim foi incorporado desde o primeiro dia, mirando buscas como "personal trainer Berlin" e "vegan fitness coach Berlin".',
      results: 'Um site de personal training totalmente otimizado para conversão, no ar em Berlim, construído, projetado e publicado pelo Blok Blok Studio. Os clientes agora agendam e pagam diretamente pelo site, eliminando mensagens diretas e faturas. O posicionamento em SEO local traz tráfego orgânico de quem busca em Berlim.',
    },
    'bronco-plumbing': {
      desc: 'Site gerador de leads e sistema de crescimento online para uma empresa de encanamento em Dallas-Fort Worth.',
      challenge: 'Colton Staley abriu a Bronco Plumbing em Dallas-Fort Worth em 2026 como uma empresa de primeiro ano, operada pelo próprio dono. Começando do zero: sem site, sem presença online, sem nenhuma forma de os moradores de DFW que procuravam um encanador o encontrarem. Nos serviços residenciais, quem aparece primeiro no Google com prova de trabalho de qualidade é quem recebe a ligação.',
      solution: 'Construímos um site focado em conversão em torno do próprio Colton: o dono em cada atendimento, orçamentos honestos e avaliações reais do Google carregadas ao vivo. Cada seção leva a uma ligação ou a um pedido de orçamento, com uma barra de chamada fixa no celular para quem busca no meio de uma emergência. O SEO local para buscas de encanador em DFW foi incorporado desde o primeiro dia, e o pipeline de contato alimenta diretamente o fluxo de trabalho dele.',
      results: 'Nos primeiros 5 meses, Colton gerou mais de $50.000 em receita bruta entre o trabalho de encanamento e o sistema online. O site mantém uma nota 5,0 em 52 avaliações no Google, aparece em uma posição média de 5,2 no Google para os seus termos de busca e acumulou mais de 8.000 impressões de busca nos primeiros 3 meses de acompanhamento.',
      metrics: [
        {
          value: '$50 mil',
          label: 'Receita bruta nos primeiros 5 meses',
        },
        {
          value: '5,0',
          label: 'Nota no Google em 52 avaliações',
        },
        {
          value: '5,2',
          label: 'Posição média no Google',
        },
        {
          value: '8.000+',
          label: 'Impressões de busca em 3 meses',
        },
      ],
    },
    'coach-kofi': {
      desc: 'Marca pessoal de alto desempenho e plataforma de coaching com identidade visual ousada.',
      challenge: 'O Coach Kofi precisava de um site de marca pessoal à altura da sua filosofia ousada "Just Do The Work". A presença online existente não refletia a energia e a autoridade que ele traz para o coaching de movimento, desempenho e desenvolvimento.',
      solution: 'Projetamos um site marcante em preto e branco, com tipografia forte, integração de fotografia profissional e um fluxo claro de conversão de visitante a cliente de coaching. O site tem agendamento em tempo real, contadores de prova social (mais de 150 clientes, mais de 8.000 horas de coaching) e design responsivo mobile-first.',
      results: 'Uma presença de marca profissional que comunica autoridade na hora. O fluxo de agendamento simplificado aumentou os pedidos de consulta em 200%, e o design ousado se tornou parte da assinatura da identidade do Coach Kofi em todas as plataformas.',
      metrics: [
        {
          value: '200%',
          label: 'Mais pedidos de consulta após o lançamento',
        },
      ],
    },
    'exotic-ripz': {
      desc: 'Plataforma de e-commerce vibrante para uma marca de comunidade de cards colecionáveis.',
      challenge: 'A Exotic Ripz precisava de uma loja online que capturasse a empolgação e a energia da comunidade de cards colecionáveis. Precisava de uma plataforma capaz de lidar com booster packs, novos lançamentos, reposições e engajamento da comunidade no Discord, na Twitch e nas redes sociais.',
      solution: 'Construímos uma loja Shopify completa com branding animado e ousado, links integrados para a comunidade no Discord, presença em várias plataformas (Discord, YouTube, Twitch, TikTok, Instagram, X, Threads), categorização inteligente de produtos e pop-ups otimizados para conversão na captura de e-mails.',
      results: 'Mais de $191.000 em vendas de cards colecionáveis em 1.790 pedidos na loja que construímos e entregamos, com o sistema de envio configurado de ponta a ponta. A lista de e-mails cresceu 400% no primeiro mês com a captura inteligente por desconto, e os lançamentos de booster packs esgotavam consistentemente em poucas horas. A loja foi devolvida aos donos para manutenção, e eles desde então tiraram o site do ar, por isso não há link ao vivo para compartilhar.',
      metrics: [
        {
          value: '$191 mil',
          label: 'Vendas pela loja',
        },
        {
          value: '1.790',
          label: 'Pedidos enviados',
        },
        {
          value: '400%',
          label: 'Crescimento da lista de e-mails no primeiro mês',
        },
      ],
    },
    'kds-systems': {
      desc: 'Plataforma moderna de soluções em nuvem para um provedor de serviços gerenciados de TI e computação em nuvem.',
      challenge: 'A KDS Systems Inc. precisava de uma presença digital profissional que comunicasse a sua experiência em computação em nuvem, Microsoft Office 365, soluções de armazenamento e aplicações hospedadas. O site existente não transmitia a escala e a confiabilidade dos seus serviços gerenciados de TI.',
      solution: 'Projetamos um site elegante e moderno, com estética escura e tecnológica, cores de destaque em verde vivo e uma divisão clara dos serviços. O site tem seções de computação em nuvem, armazenamento e aplicações hospedadas com iconografia visual, chamadas para agendar consultoria e sinais de confiança de nível corporativo.',
      results: 'Uma presença de marca profissional que posiciona a KDS Systems como parceira confiável em soluções de nuvem. O fluxo simplificado de agendamento de consultoria e a comunicação clara dos serviços aumentaram significativamente os leads qualificados.',
    },
    'public-affair': {
      desc: 'Identidade de marca sofisticada e experiência web para uma marca de estilo de vida premium.',
      challenge: 'A Public Affair precisava de uma presença digital que transmitisse luxo, sofisticação e exclusividade. A marca exigia uma experiência elegante de verificação de idade que definisse o tom antes mesmo de os visitantes entrarem no site principal.',
      solution: 'Criamos uma experiência de marca elegante que começa com uma verificação de idade lindamente desenhada, com tipografia cursiva personalizada e uma rica paleta em azul-marinho e dourado. Cada ponto de contato foi projetado para parecer premium, do monograma P.A. ao texto refinado que faz a verificação parecer um convite, não uma barreira.',
      results: 'O reconhecimento da marca cresceu significativamente nos públicos-alvo. A experiência de verificação de idade tem uma taxa de conclusão acima de 95%. Os visitantes apreciam a entrada em vez de desistirem. O posicionamento premium levou a um valor percebido maior e a pedidos de valor médio mais alto.',
      metrics: [
        {
          value: '95%+',
          label: 'Visitantes que concluem a verificação de idade',
        },
      ],
    },
    'military-newschool': {
      desc: 'Presença web institucional para o Center for Military-Affiliated Students da The New School.',
      challenge: 'O Center for Military-Affiliated Students da The New School, fundado em 2023, precisava de uma presença digital que honrasse a comunidade ligada às forças armadas e ao mesmo tempo se encaixasse na linguagem de design moderna da universidade. O site precisava comunicar com clareza os serviços de apoio, os programas e os recursos.',
      solution: 'Projetamos uma página limpa e profissional dentro do ecossistema da The New School, com fotografia envolvente, arquitetura de informação clara e conteúdo acessível que acolhe os estudantes ligados às forças armadas em uma comunidade de acadêmicos, artistas e designers.',
      results: 'O centro agora tem uma presença digital forte que comunica a sua missão com eficácia. Mais engajamento de futuros estudantes ligados às forças armadas e acesso simplificado aos programas e serviços de apoio.',
    },
    'grant-parkhurst': {
      desc: 'Site de portfólio e portal de fotos com autoatendimento para clientes de um fotógrafo de Salt Lake City.',
      challenge: 'Grant Parkhurst fotografa retratos, eventos e em filme analógico em Salt Lake City. Ele precisava de um único lugar que mostrasse o trabalho nas suas proporções naturais, listasse as cidades que atende, recebesse agendamentos e permitisse entregar galerias finalizadas aos clientes sem ficar enviando links de download por e-mail.',
      solution: 'Construímos um site que coloca a fotografia em primeiro lugar, onde nenhuma foto é cortada, com cards de serviços, capas de álbum alinhadas em cada fileira, uma seção de cobertura e um fluxo de agendamento. Por trás dele há um portal de clientes em /portal: Grant faz login, cria galerias, envia para o seu próprio armazenamento de fotos e as compartilha, e os clientes visualizam e baixam os seus conjuntos.',
      results: 'O site e o portal entraram no ar em agosto e setembro de 2026, com Grant gerenciando as suas próprias galerias desde o primeiro dia. O domínio público saiu da nossa hospedagem desde então, por isso não há link ao vivo aqui; as capturas de tela mostram o site como o entregamos.',
    },
  },
  blog: {
    'why-your-website-is-losing-customers': {
      readTime: '5 min de leitura',
      content: `Seu site perde clientes por motivos previsíveis: carrega devagar demais, não diz o que você faz, frustra quem acessa pelo celular e não dá aos visitantes nenhum motivo para confiar em você. Nada disso é achismo. Pesquisas do Google, do Nielsen Norman Group e do Baymard Institute colocam números em cada um desses pontos, e todos têm solução.

## 1. Carregamento lento mata conversões

Quando a BBC estudou o próprio tráfego, descobriu que perdia 10% a mais de usuários a cada segundo adicional que o site levava para carregar. O lado positivo é igualmente real: a Vodafone melhorou o seu Largest Contentful Paint em 31% e as vendas subiram 8%, e a Rakuten 24 aumentou a receita por visitante em 53% depois de atingir os limites dos Core Web Vitals. Os três resultados estão documentados nos estudos de caso do web.dev do Google (veja as Fontes abaixo).

As metas atuais do Google são concretas: conteúdo principal visível (LCP) em até 2,5 segundos, resposta a toques e cliques (INP) em até 200 milissegundos e deslocamento de layout (CLS) abaixo de 0,1, medidos no percentil 75 das visitas reais.

**A solução:** comprima e redimensione as imagens (WebP ou AVIF), sirva o site por uma CDN, corte o JavaScript sem uso e carregue sob demanda tudo o que fica abaixo da dobra. Um framework moderno como o Next.js cuida da maior parte disso por padrão.

## 2. Nenhuma proposta de valor clara

O Nielsen Norman Group, com base em uma análise de mais de 200 milhões de visitas a páginas, descobriu que os primeiros 10 segundos são decisivos. Se uma página não comunica o seu valor nessa janela, a maioria dos visitantes vai embora. Quem fica além dos 30 segundos costuma ficar por minutos. E um estudo de pesquisadores do Google descobriu que as pessoas formam um julgamento sobre o apelo visual de um site em 50 milissegundos, antes de ler uma única palavra.

**A solução:** abra com um título claro e orientado a benefícios. Diga aos visitantes exatamente que problema você resolve e para quem. Aberturas genéricas como "Bem-vindo ao Nosso Site" desperdiçam os únicos segundos que importam.

## 3. Experiência ruim no celular

O Google usa a versão mobile do seu site, rastreada com um agente de smartphone, para indexar e classificar. Os dados de rede da Cloudflare mostram que 43% de todas as requisições web vieram de dispositivos móveis em 2025, contra 41% no ano anterior. Se o seu site tem alvos de toque minúsculos e texto ilegível no celular, você está falhando com o Google e com uma parcela enorme do seu público.

**A solução:** projete mobile-first e teste em aparelhos reais. As WCAG 2.2 definem o piso de acessibilidade para alvos de toque em 24 por 24 pixels CSS; trate isso como mínimo e faça os botões principais confortavelmente maiores. Mantenha o texto legível sem zoom e a navegação ao alcance do polegar.

## 4. Chamadas para ação fracas ou ausentes

Se os visitantes não conseguem descobrir o que fazer em seguida, eles vão embora. Toda página precisa de uma chamada para ação clara, seja agendar uma conversa, pedir um orçamento ou baixar um material.

**A solução:** use uma chamada principal por página. Deixe-a visualmente destacada com cores contrastantes. Use linguagem orientada à ação ("Receba Sua Auditoria Gratuita" ganha de "Enviar").

## 5. Nenhum sinal de confiança

A meta-análise de 50 estudos do Baymard Institute coloca o abandono médio de carrinho em pouco mais de 70%. Entre os motivos que têm solução, 19% dos compradores nos EUA disseram não confiar no site com os dados do cartão de crédito, e 17% abandonaram por causa de erros ou travamentos do site. O Web Credibility Project de Stanford, construído sobre pesquisas com mais de 4.500 participantes, descobriu que as pessoas julgam a credibilidade de um site em grande parte pelo design visual, e recomenda mostrar as pessoas reais por trás do site, um endereço físico e informações de contato claras.

**A solução:** adicione prova social por todo o site, não só em uma página de depoimentos. Mostre resultados reais, pessoas reais e números reais. Deixe os seus dados de contato fáceis de encontrar.

## Pronto para consertar o seu site?

Se algum desses problemas soa familiar, você não está sozinho. A maioria dos sites de empresas sofre de pelo menos dois ou três deles. A boa notícia? Todos têm solução.

Agende uma conversa estratégica gratuita com a nossa equipe e mostraremos exatamente o que está segurando o seu site e como transformá-lo em um motor de crescimento.

## Fontes

- **Google web.dev, Why speed matters**: https://web.dev/articles/why-speed-matters
- **Google web.dev, Core Web Vitals**: https://web.dev/articles/vitals
- **Nielsen Norman Group, How Long Do Users Stay on Web Pages?**: https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/
- **Tuch et al., estudo sobre primeiras impressões (Google Research)**: https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/
- **Cloudflare Radar 2025 Year in Review**: https://blog.cloudflare.com/radar-2025-year-in-review/
- **W3C, WCAG 2.2 Target Size (Minimum)**: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- **Baymard Institute, Cart Abandonment Rate Statistics**: https://baymard.com/lists/cart-abandonment-rate
- **Stanford Web Credibility Project, Guidelines**: https://credibility.stanford.edu/guidelines/index.html`,
    },
    'seo-checklist-2026': {
      readTime: '7 min de leitura',
      content: `Ranquear em 2026 continua sendo uma questão de fundamentos: um site que o Google consegue rastrear, páginas que carregam rápido, uma estrutura que as máquinas conseguem interpretar e conteúdo que responde a perguntas reais. O Google confirma que esses mesmos fundamentos agora decidem se você aparece também nas AI Overviews e no AI Mode. Esta é a checklist que aplicamos em todo site que construímos.

## Fundamentos de SEO técnico

- **HTTPS em tudo**: o Google usa o HTTPS como sinal de classificação desde 2014. É um sinal leve, mas os navegadores sinalizam sites inseguros e os visitantes percebem.
- **Core Web Vitals rápidos**: LCP abaixo de 2,5 segundos, INP abaixo de 200 milissegundos, CLS abaixo de 0,1, medidos no percentil 75 das visitas reais. O INP substituiu o FID como métrica de responsividade em 2024, então aposente qualquer painel antigo de FID.
- **Indexação mobile-first**: o Google rastreia com um agente de smartphone e usa a sua versão mobile para indexar e classificar. O seu site mobile É o seu site.
- **Estrutura de URL limpa**: use URLs descritivas e legíveis. Evite parâmetros de consulta sempre que possível.
- **Sitemap XML**: envie ao Google Search Console. Mantenha-o atualizado.
- **robots.txt**: bloqueie o que não deve ser indexado (páginas de administração, rotas de API).

## SEO On-Page

- **Títulos únicos**: o Google diz que não há um limite fixo de caracteres, mas títulos longos são cortados para caber na tela. Coloque as palavras importantes no início, dê a cada página um texto descritivo distinto e evite textos padrão e palavras-chave repetidas.
- **Meta descrições**: escreva um resumo atraente para cada página. O Google corta trechos longos, então coloque o valor na primeira frase.
- **Hierarquia de títulos**: um H1 por página, estrutura lógica de H2 a H6.
- **Links internos**: conecte páginas relacionadas. Use textos de âncora descritivos.
- **Otimização de imagens**: texto alternativo, formatos comprimidos (WebP/AVIF), carregamento sob demanda.

## Dados estruturados

Os dados estruturados ajudam o Google a entender o seu conteúdo e podem render resultados ricos (listas de perguntas frequentes, avaliações com estrelas, breadcrumbs). Os próprios estudos de caso do Google mostram que isso move números reais: a Rotten Tomatoes mediu uma taxa de cliques 25% maior em páginas com dados estruturados, e a Nestlé mediu uma taxa de cliques 82% maior em páginas que aparecem como resultados ricos.

- **Schema Organization**: diga ao Google quem você é.
- **Schema LocalBusiness**: essencial para SEO local.
- **Schema BreadcrumbList**: ajuda a navegação nos resultados de busca.
- **Schema FAQPage**: pode render trechos expandidos de perguntas frequentes na busca.
- **Schema Article**: para artigos de blog e notícias.

## Busca por IA continua sendo SEO

O Google é explícito: não há requisitos adicionais para aparecer nas AI Overviews ou no AI Mode. Nenhum arquivo especial, nenhuma marcação nova, nenhuma otimização separada. Os mesmos fundamentos de rastreabilidade, experiência de página e conteúdo útil decidem se os recursos de IA exibem e citam as suas páginas. E se você quiser limitar como eles usam o seu conteúdo, os controles existentes (nosnippet, max-snippet, noindex) continuam valendo.

## Estratégia de conteúdo

- **Mire em palavras-chave de cauda longa**: menos concorrência, maior intenção.
- **Responda a perguntas reais**: garimpe o "As pessoas também perguntam" e os e-mails dos seus próprios clientes em busca de ideias de conteúdo.
- **Mantenha o conteúdo atual**: revise a cada trimestre. Atualize fatos, capturas de tela e datas para que as páginas continuem precisas.
- **Construa autoridade temática**: crie grupos de conteúdo relacionado em torno dos seus temas centrais.

## Resumindo

SEO não é um projeto único. É uma prática contínua. Mas acertar os fundamentos desde o primeiro dia dá a você uma vantagem enorme sobre concorrentes que o tratam como detalhe.

Se preferir não percorrer esta checklist sozinho, agende uma conversa estratégica gratuita e mostraremos exatamente onde o seu site está e o que corrigir primeiro.

## Fontes

- **Google web.dev, Core Web Vitals**: https://web.dev/articles/vitals
- **Google Search Central, HTTPS as a ranking signal**: https://developers.google.com/search/blog/2014/08/https-as-ranking-signal
- **Google Search Central, Mobile-first indexing**: https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
- **Google Search Central, Title links**: https://developers.google.com/search/docs/appearance/title-link
- **Google Search Central, Structured data introduction**: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- **Google Search Central, AI features and your website**: https://developers.google.com/search/docs/appearance/ai-features`,
    },
    'brand-identity-investment': {
      readTime: '5 min de leitura',
      content: `A maioria das empresas trata o branding como decoração. Os números dizem o contrário. O ranking BrandZ da Kantar avalia as 100 marcas mais valiosas do mundo em 13,1 trilhões de dólares combinados em 2026, um aumento de 22% em um único ano. A marca é um ativo e, como todo ativo, se valoriza com o tempo. Veja o que uma identidade forte realmente faz por um negócio e como saber quando a sua está segurando você.

## O que é identidade de marca, de fato

A identidade de marca é o sistema visual e verbal completo que representa o seu negócio. Inclui o seu logo, a paleta de cores, a tipografia, a voz, a mensagem e os sentimentos que as pessoas associam ao seu nome.

Pense nas marcas mais valiosas do mundo. Você as reconhece na hora, não só pelo logo, mas por toda a linguagem visual e pela forma como fazem você se sentir.

## Por que isso importa para o crescimento

**1. Confiança à primeira vista.** Uma pesquisa do Google descobriu que as pessoas formam um julgamento sobre o apelo visual de um site em 50 milissegundos após vê-lo. O Web Credibility Project de Stanford, baseado em estudos com mais de 4.500 participantes, descobriu que as pessoas julgam a credibilidade em grande parte pelo design visual. Uma marca polida e coesa sinaliza profissionalismo antes de alguém ler uma palavra.

**2. Preços premium.** A Kantar mede a força de uma marca em parte como poder de precificação: a capacidade de cobrar mais do que os concorrentes sem perder demanda. Esse poder de precificação é uma grande parte do motivo pelo qual o valor das marcas mais fortes do mundo continua subindo enquanto concorrentes mais fracos brigam por preço.

**3. Fidelidade dos clientes.** A Harvard Business Review documentou o que aconteceu quando empresas investiram em conexão emocional com os clientes: um banco aumentou o uso de produtos no seu segmento-alvo em 70% e as novas contas em 40%, e um varejista de moda mais do que triplicou o crescimento das vendas em lojas comparáveis. As pessoas não compram apenas produtos, elas compram marcas.

**4. Eficiência de marketing.** Quando a sua marca é clara e consistente, cada real investido em marketing trabalha mais. As pessoas lembram de você. Reconhecem você. Voltam.

## Sinais de que você precisa renovar a marca

- Sua identidade visual parece datada ou inconsistente entre as plataformas
- Os clientes não conseguem explicar o que torna você diferente
- Você compete principalmente por preço, não por valor
- Sua equipe não sabe ao certo como representar a marca de forma consistente

## Onde a sua marca vive: no seu site

Você não precisa de um orçamento de Fortune 500 para colocar essa pesquisa em prática. Para a maioria das empresas, o lugar onde a identidade de marca encontra os clientes é o site. É lá que acontece a primeira impressão de 50 milissegundos, onde a credibilidade é julgada e onde uma identidade inconsistente custa pedidos de contato em silêncio.

Se o seu site atual não parece o negócio que você de fato construiu, agende uma conversa estratégica gratuita e mostraremos como poderia ser um site que conquista essa confiança.

## Fontes

- **Kantar BrandZ Most Valuable Global Brands**: https://www.kantar.com/campaigns/brandz/global
- **Tuch et al., estudo sobre primeiras impressões (Google Research)**: https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/
- **Stanford Web Credibility Project, Guidelines**: https://credibility.stanford.edu/guidelines/index.html
- **Harvard Business Review, The New Science of Customer Emotions**: https://hbr.org/2015/11/the-new-science-of-customer-emotions`,
    },
  },
  videos: {
    kofi: {
      name: 'Coach Kofi sobre trabalhar com o Blok Blok Studio',
      description: 'Depoimento em vídeo do Coach Kofi, atleta Nike e personal trainer em Berlim, gravado na sua academia. O Blok Blok Studio construiu o coachkofi.de; os pedidos de consulta cresceram 200% após o lançamento.',
      transcript: `Eu venho trabalhando com o Chase no meu site, e o resultado ficou completamente insano. Ele me deu aquele visual de logo da Apple, design da Apple. As coisas aparecem na tela de um jeito muito bonito. O site tem um acabamento suave.

Eu, pessoalmente, gosto de sites de uma página só. Foi isso que decidimos. A comunicação com ele é muito fácil. Ele é um cara bom, cara. Muito determinado.

E eu acho que você precisa de alguém para trabalhar com você na sua camada externa de software. Você precisa de alguém que responda rápido, que saiba das coisas e que consiga se adaptar às suas necessidades.

Então, sim, eu recomendo muito o Chase, ou o Blok Blok Studio. Trabalhar com eles me ajudou de verdade. É isso, cara. Dá uma chance para eles. Eles são muito bons.`,
    },
    luki: {
      name: 'Coach Luki sobre trabalhar com o Blok Blok Studio',
      description: 'Depoimento em vídeo do Coach Luki, personal trainer em Berlim. O Blok Blok Studio construiu o coachluki.com, que recebe os agendamentos e pagamentos dele diretamente no site, em vez de por mensagens diretas e faturas manuais.',
      transcript: `Eu sou personal trainer em Berlim, e conheci o Chase, ou o Blok Blok Studio, por um amigo meu que já tinha trabalhado com ele antes. Então marquei uma conversa com ele, falamos sobre os meus objetivos, a minha visão para o site, e senti que fui entendido logo de cara. Também teve uma vibe muito familiar, o que deixou o trabalho com o Chase bem mais tranquilo, com certeza.

O Chase é simplesmente um cara ótimo, muito paciente com você. Trabalhamos juntos em uma época em que eu estava com muita coisa acontecendo na minha vida pessoal, e ele foi muito paciente comigo, garantindo que eu continuasse no caminho certo e me guiando por todo o processo sem me deixar sobrecarregado, o que foi um grande destaque para mim.

A comunicação dele é ótima, ele responde muito rápido, isso é um grande ponto positivo. Eu tinha muitas ideias que queria colocar no site, e ele passou por essas ideias, essas visões que eu tinha para o site, e garantiu que elas combinassem com a identidade da marca, sem nunca descartar nenhuma ideia. Então isso foi um grande destaque para mim.

Durante todo o processo eu me senti visto, me senti ouvido, senti que estava sendo envolvido em tudo e, o mais importante, me senti genuinamente bem cuidado. E isso não é mais a regra hoje em dia, eu diria.

O que eu mais amo no site é que ele não é só mais um template que qualquer um monta. Tem muita intenção por trás dele. Focamos na jornada do cliente, na experiência do usuário, e garantimos que o site, a identidade da marca, parecessem autênticos e memoráveis.

Então, se você está procurando alguém que cuide de você, que foque nos detalhes, que esteja ali por você e que responda rápido, você está definitivamente no lugar certo com o Chase, ou com o Blok Blok Studio, neste caso.`,
    },
    founder: {
      name: 'Uma palavra do fundador do Blok Blok Studio',
      description: 'Chase Haynes mostra onde as empresas de serviços perdem clientes online sem perceber e como o Blok Blok Studio resolve isso, em uma gravação de tela sobre o site do estúdio.',
      transcript: `Meu nome é Chase, fundador do Blok Blok Studio. Eu posso contar todos os estudos de caso do mundo sobre o nosso negócio, mas se você não me conhece como pessoa, isso nem importa. Então vou me apresentar.

Meu nome é Chase. Sou de San Diego, na Califórnia. Cresci em várias partes dos Estados Unidos e acabei na Costa Leste. Entrei para os Fuzileiros Navais, fiquei lá por cinco anos. Saí, me mudei para Nova York para estudar na Parsons School of Design. Me formei, Bacharel em Belas Artes em Design e Tecnologia. Depois disso, fundei a minha agência, o Blok Blok Studio, em junho de 2024. Então me mudei para Berlim, na Alemanha, cerca de um ano depois.

De lá para cá, só temos escalado o negócio. Ele vem crescendo, tudo está acelerando. Agora temos uma equipe de quatro pessoas. Tenho o meu diretor criativo na Virgínia, a minha estrategista de marketing em Los Angeles e o meu desenvolvedor full stack aqui em Berlim, na Alemanha. Tem sido uma jornada incrível, e estamos aqui todos os dias dando o nosso melhor.

Adoraria trabalhar com você. Abaixo, você vai ver vários estudos de caso. Vai ver quatro exemplos do trabalho que fizemos. Passe por eles, dê uma olhada. Se tiver dúvidas, me chame no Instagram ou por e-mail, o que for melhor para você.

Abaixo disso, temos um formulário de contato. É só colocar as suas informações. Ele chega direto para mim, eu dou uma olhada, marcamos uma conversa e vemos se faz sentido. Se fizer, ótimo. Se não, tudo bem. Mas estou realmente ansioso para conhecer você, e tenha um ótimo dia. Até logo.`,
    },
  },
  specialties: {
    'webdesign-berlin': {
      metaTitle: 'Web Design em Berlim | Blok Blok Studio',
      metaDescription: 'Agência de web design em Berlim. Sites personalizados em Next.js que conquistam clientes. Sem templates, sem construtores de sites. Primeira conversa gratuita.',
      kicker: 'Agência de Web Design em Berlim',
      h1: 'Web design de Berlim que traz clientes',
      intro: 'Projetamos e desenvolvemos sites personalizados para empresas em Berlim e no mundo inteiro. Cada site é construído do zero: rápido, otimizado para os mecanismos de busca e voltado a um único objetivo, transformar visitantes em clientes.',
      stats: [
        {
          value: '15+',
          label: 'Projetos entregues',
        },
        {
          value: '100%',
          label: 'Desenvolvido sob medida, sem templates',
        },
        {
          value: '2',
          label: 'Coaches de Berlim com agendamentos acontecendo pelo próprio site',
        },
      ],
      featuresHeading: 'O que você recebe',
      features: [
        {
          title: 'Design personalizado, sem construtor de sites',
          desc: 'Cada site é desenvolvido à mão em Next.js. Isso significa: tempos de carregamento melhores, melhor posição no Google e um design que não existe em nenhum outro lugar.',
        },
        {
          title: 'SEO desde o primeiro dia',
          desc: 'Estrutura limpa, termos de busca locais, dados estruturados e valores de desempenho que o Google recompensa. O seu site deve ser encontrado, não apenas parecer bonito.',
        },
        {
          title: 'Agendamentos e pagamentos direto no site',
          desc: 'Agendamento de horários, pagamentos via Stripe, formulários de contato com notificação imediata. O seu site trabalha, mesmo quando você não está trabalhando.',
        },
        {
          title: 'Visível na busca por IA (AEO)',
          desc: 'Cada vez mais clientes perguntam ao ChatGPT, ao Perplexity ou à AI Overview do Google em vez de pesquisar no Google do jeito clássico. Incorporamos dados estruturados, formatos de resposta e llms.txt para que o seu site seja citado nas respostas de IA.',
        },
        {
          title: 'Atendimento a partir de Berlim',
          desc: 'Contato direto, respostas rápidas, entrega pessoal. Sem sistema de chamados, sem fila de espera de agência.',
        },
      ],
      caseStudy: {
        heading: 'Na prática',
        name: 'Coach Luki, personal trainer em Berlim',
        result: 'Agendamentos e pagamentos passam inteiramente pelo site',
        body: 'Luke Satterly treina clientes no Holmes Place e no John Reed. O seu site recebe agendamentos e processa pagamentos via Stripe, sem mensagens diretas e sem faturas feitas à mão. Além disso, otimização para buscas locais com termos como "Personal Trainer Berlin".',
        linkLabel: 'Ver o estudo de caso',
      },
      faqHeading: 'Perguntas frequentes',
      faqs: [
        {
          q: 'Quanto custa um site no Blok Blok Studio?',
          a: 'Cada projeto é orçado individualmente, de acordo com o escopo e as funcionalidades. Depois de uma primeira conversa gratuita, você recebe uma proposta de preço fixo com entregas claramente definidas. Há uma visão geral na nossa página de preços.',
        },
        {
          q: 'Quanto tempo leva o desenvolvimento?',
          a: 'Um site empresarial típico fica no ar em 2 a 4 semanas. Projetos maiores, com sistema de agendamento ou loja, levam proporcionalmente mais tempo. Definimos o cronograma exato antes do início do projeto.',
        },
        {
          q: 'Vocês só trabalham com empresas de Berlim?',
          a: 'Não. Estamos em Berlim e atendemos clientes locais pessoalmente, mas trabalhamos com empresas do mundo inteiro, inclusive nos Estados Unidos.',
        },
        {
          q: 'Por que não um site feito por IA ou um construtor como o Wix?',
          a: 'Construtores com IA entregam em minutos um site que parece igual a mil outros, carrega devagar e não é encontrado de forma confiável nem no Google nem na busca por IA. Um site desenvolvido sob medida custa mais, mas conquista clientes de forma mensurável. Os nossos estudos de caso mostram os números.',
        },
        {
          q: 'Por que Next.js em vez de WordPress ou Wix?',
          a: 'Sites em Next.js carregam mais rápido, são mais seguros e ranqueiam melhor, porque não carregam o peso de plugins e temas. Você recebe exatamente o que o seu negócio precisa, e nada que o atrase.',
        },
      ],
      ctaHeading: 'Vamos conversar sobre o seu projeto',
      ctaBody: 'Primeira conversa gratuita, 15 minutos. Você nos conta o que precisa e nós dizemos com honestidade como faríamos.',
      ctaButton: 'Agendar conversa gratuita',
    },
    'plumber-website-design': {
      metaTitle: 'Sites para Encanadores | Blok Blok Studio',
      metaDescription: 'Sites para encanadores e empresas de serviços residenciais que transformam buscas no Google e na IA em serviços agendados. Nosso cliente de encanamento, no primeiro ano, gerou $50 mil com o site.',
      kicker: 'Ofícios e Serviços Residenciais',
      h1: 'Sites para encanadores que transformam buscas em serviços agendados',
      intro: 'Quando um cano estoura, o morador pesquisa, liga para o primeiro resultado confiável e nunca mais volta a rolar a página. Construímos sites para encanadores e empresas de serviços residenciais que vencem esse momento: rápidos, prontos para o SEO local e construídos em torno do botão de ligar.',
      stats: [
        {
          value: '$50 mil',
          label: 'Receita gerada pelo nosso cliente de encanamento nos primeiros 5 meses',
        },
        {
          value: '5,0',
          label: 'Nota em 52 avaliações no Google, exibidas ao vivo no site',
        },
        {
          value: '8.000+',
          label: 'Impressões de busca no Google nos primeiros 3 meses de acompanhamento',
        },
      ],
      featuresHeading: 'O que um site de serviços precisa para gerar trabalho de verdade',
      features: [
        {
          title: 'Uma barra de chamada fixa no celular',
          desc: 'A maioria das buscas de emergência acontece no celular. O número fica na tela o tempo todo, então no momento em que o morador decide, ele toca uma vez e o telefone toca.',
        },
        {
          title: 'SEO local incorporado desde o primeiro dia',
          desc: 'Páginas de serviço por tipo de trabalho, segmentação por cidade, schema de avaliações e alinhamento com o Perfil da Empresa no Google. O objetivo é simples: aparecer quando a sua região busca "encanador perto de mim".',
        },
        {
          title: 'Avaliações reais, carregadas ao vivo',
          desc: 'As suas avaliações do Google aparecem automaticamente no site. Prova sempre atualizada sem você mexer em nada, e os mesmos sinais de confiança que o Google recompensa.',
        },
        {
          title: 'Visível na busca por IA, não só no Google',
          desc: 'Os moradores perguntam cada vez mais ao ChatGPT e às AI Overviews do Google "quem é o melhor encanador perto de mim". Construímos os dados estruturados e o conteúdo orientado a respostas (AEO) que fazem o seu negócio ser citado nessas respostas de IA.',
        },
        {
          title: 'Leads direto no seu fluxo de trabalho',
          desc: 'Pedidos de orçamento e contatos chegam na sua caixa de entrada e no seu pipeline de serviços na hora. Nos serviços residenciais, quem responde primeiro fica com o trabalho.',
        },
      ],
      caseStudy: {
        heading: 'Estudo de caso',
        name: 'Bronco Plumbing, Dallas-Fort Worth',
        result: '$50.000 de receita bruta nos primeiros 5 meses de atividade',
        body: 'Colton Staley abriu a Bronco Plumbing sem site e sem presença online. Construímos um site focado em conversão em torno dele: o dono em cada atendimento, orçamentos honestos, avaliações do Google ao vivo e uma barra de chamada fixa para buscas no meio de uma emergência. O site aparece em uma posição média de 5,2 para os seus termos de busca.',
        linkLabel: 'Ler o estudo de caso completo',
      },
      faqHeading: 'Perguntas comuns',
      faqs: [
        {
          q: 'Quanto custa um site para encanador?',
          a: 'Cada projeto é orçado de acordo com o escopo após uma conversa gratuita de 15 minutos. Você recebe um preço fixo com entregas definidas antes de começarmos. Veja na nossa página de preços como os projetos são estruturados.',
        },
        {
          q: 'Quanto tempo até o site começar a gerar leads?',
          a: 'O site em si costuma ficar no ar em 2 a 4 semanas. O SEO local se acumula ao longo dos meses seguintes; o nosso cliente de encanamento registrou mais de 8.000 impressões de busca nos primeiros 3 meses de acompanhamento.',
        },
        {
          q: 'Vocês trabalham com outros ofícios além de encanamento?',
          a: 'Sim. A mesma estratégia funciona para eletricistas, climatização, telhados e qualquer serviço residencial em que os clientes pesquisam localmente e ligam: SEO local, avaliações ao vivo e um site construído em torno da ligação.',
        },
        {
          q: 'Por que não usar simplesmente um construtor de sites com IA?',
          a: 'Os construtores com IA produzem um site genérico em minutos, mas não conseguem fazer o que agenda serviços de encanamento: SEO local por área de atendimento, avaliações do Google ao vivo, um layout mobile voltado à ligação e leads conectados ao seu fluxo de trabalho. Nosso cliente de encanamento gerou $50 mil em 5 meses com um site construído para o mercado dele, não a partir de um template.',
        },
        {
          q: 'Vocês conseguem conectar o site às minhas ferramentas atuais?',
          a: 'Sim. Os formulários de contato podem alimentar o seu CRM, o seu software de gestão de serviços ou um pipeline simples que montamos para você. O nosso projeto para a Bronco envia os leads diretamente para o fluxo de trabalho do dono.',
        },
      ],
      ctaHeading: 'Quer um site que agenda serviços?',
      ctaBody: 'Conversa gratuita de 15 minutos. Conte sobre a sua área de atendimento e diremos exatamente o que construiríamos.',
      ctaButton: 'Agendar conversa gratuita',
    },
    'personal-trainer-website-design': {
      metaTitle: 'Sites para Personal Trainers | Blok Blok Studio',
      metaDescription: 'Sites para personal trainers e coaches com agendamento e pagamentos integrados. Nossos clientes recebem agendamentos e pagamentos diretamente pelos seus sites. Veja exemplos reais.',
      kicker: 'Coaches e Treinadores',
      h1: 'Sites para personal trainers que agendam clientes enquanto você treina',
      intro: 'Correr atrás de leads por mensagens diretas e enviar faturas à mão limita quantos clientes você consegue atender. Construímos sites para personal trainers e coaches em que os visitantes agendam sessões e pagam diretamente no site, para que a sua agenda se preencha sozinha.',
      stats: [
        {
          value: '200%',
          label: 'Aumento nos pedidos de consulta após o lançamento (Coach Kofi)',
        },
        {
          value: '0',
          label: 'Faturas enviadas à mão desde o lançamento, pagamentos via Stripe (Coach Luki)',
        },
        {
          value: '2',
          label: 'Coaches de Berlim cujos agendamentos passam inteiramente pelos seus sites',
        },
      ],
      featuresHeading: 'O que um site de coaching precisa para converter',
      features: [
        {
          title: 'Agendamentos e pagamentos no site',
          desc: 'Os clientes escolhem um horário e pagam em um único fluxo via Stripe. Sem troca de mensagens, sem cobrar pagamentos, sem faltas por agendamentos não confirmados.',
        },
        {
          title: 'Uma página que vende o seu método',
          desc: 'Sua filosofia, seus resultados, suas provas, estruturados para que um visitante entenda o que você faz em segundos e agende antes de sair.',
        },
        {
          title: 'SEO local para a sua cidade',
          desc: 'Quando alguém busca "personal trainer" mais a sua cidade, você quer ser a resposta. Incorporamos a segmentação local desde o primeiro dia.',
        },
        {
          title: 'Encontrado na busca por IA (AEO)',
          desc: 'Os potenciais clientes agora pedem recomendações de treinadores ao ChatGPT e ao Perplexity. Dados estruturados, perguntas frequentes orientadas a respostas e llms.txt tornam o seu site citável pelos mecanismos de busca por IA, não apenas ranqueável no Google.',
        },
        {
          title: 'Prova social que se acumula',
          desc: 'Número de clientes, resultados de transformação, depoimentos em vídeo. Números reais na página fazem a venda que você não deveria precisar fazer por mensagem.',
        },
      ],
      caseStudy: {
        heading: 'Estudo de caso',
        name: 'Coach Luki, Berlim',
        result: 'Agendamentos e pagamentos passam diretamente pelo site',
        body: '"Eles construíram o meu site inteiro do zero e agora os clientes agendam e pagam diretamente por ele. Eu costumava perder horas com mensagens e faturas." Luke Satterly treina clientes no Holmes Place e no John Reed, em Berlim. O site dele cuida dos agendamentos, dos pagamentos via Stripe e do SEO local para buscas como "personal trainer Berlin".',
        linkLabel: 'Ler o estudo de caso completo',
      },
      faqHeading: 'Perguntas comuns',
      faqs: [
        {
          q: 'Quanto custa um site para personal trainer?',
          a: 'Cada projeto é orçado de acordo com o escopo após uma conversa gratuita de 15 minutos, com preço fixo e entregas definidas antes de começarmos. Veja na nossa página de preços como os projetos são estruturados.',
        },
        {
          q: 'Os clientes podem mesmo pagar pelo site?',
          a: 'Sim. Integramos o Stripe para que os clientes comprem pacotes de sessões diretamente. O dinheiro cai na sua conta, os recibos saem automaticamente e você nunca mais envia uma fatura à mão.',
        },
        {
          q: 'A maioria dos meus clientes vem do Instagram. Ainda preciso de um site?',
          a: 'O Instagram gera atenção; o site converte essa atenção. Um link na bio que leva a uma página com provas, preços e agendamento imediato fecha clientes que as mensagens diretas perdem. Os pedidos de consulta do Coach Kofi subiram mais de 200% após o lançamento.',
        },
        {
          q: 'Por que não usar simplesmente um construtor de sites com IA?',
          a: 'Um construtor com IA consegue descrever o seu coaching. Não consegue receber um agendamento, processar um pagamento via Stripe ou ranquear para "personal trainer" na sua cidade. O site se paga quando agenda clientes enquanto você treina, e isso exige engenharia de verdade, não um template gerado.',
        },
        {
          q: 'Vocês só trabalham com coaches de fitness?',
          a: 'Não. A mesma estrutura funciona para qualquer coach ou consultor que agenda sessões: nutrição, desempenho, coaching de negócios. Se o seu negócio depende de conversas agendadas, esta é a estratégia.',
        },
      ],
      ctaHeading: 'Pronto para encher a sua agenda?',
      ctaBody: 'Conversa gratuita de 15 minutos. Conte como você consegue clientes hoje e mostraremos o que o site deveria fazer.',
      ctaButton: 'Agendar conversa gratuita',
    },
    'ecommerce-website-design': {
      metaTitle: 'Design de Lojas Online | Blok Blok Studio',
      metaDescription: 'Design de e-commerce e lojas Shopify que vendem. Construímos uma loja de cards colecionáveis que faturou $191 mil em 1.790 pedidos. Lojas focadas em conversão e prontas para a busca por IA.',
      kicker: 'E-commerce e Shopify',
      h1: 'Lojas online construídas para vender, não só para existir',
      intro: 'Uma loja não é um catálogo. Cada escolha, da grade de produtos ao checkout e à captura de e-mails, ou leva o visitante à compra ou o perde. Projetamos e construímos lojas online em que os números comprovam o design.',
      stats: [
        {
          value: '$191 mil',
          label: 'Vendas na loja de cards colecionáveis que construímos e entregamos',
        },
        {
          value: '1.790',
          label: 'Pedidos por essa loja',
        },
        {
          value: '400%',
          label: 'Crescimento da lista de e-mails no primeiro mês com captura inteligente',
        },
      ],
      featuresHeading: 'O que converte no e-commerce',
      features: [
        {
          title: 'Design de loja com a conversão em primeiro lugar',
          desc: 'Páginas de produto construídas em torno da decisão de compra: preços claros, urgência onde ela é honesta e um checkout sem nada no caminho.',
        },
        {
          title: 'Captura de e-mails que realmente faz a lista crescer',
          desc: 'Captura por desconto em troca do e-mail, posicionada onde converte. A lista do nosso cliente cresceu 400% no primeiro mês, e o e-mail é o canal que pertence a você.',
        },
        {
          title: 'Lançamentos, reposições e comunidade',
          desc: 'Lançamentos de produtos que esgotam precisam de contagens regressivas, fluxos de "avise-me" e integração com a comunidade (Discord, redes sociais) conectados à loja, não colados por cima.',
        },
        {
          title: 'Pronta para a busca por IA e os motores de resposta',
          desc: 'Os compradores perguntam aos assistentes de IA o que comprar antes mesmo de abrir o Google. Schema de produto, feeds limpos e conteúdo orientado a respostas (AEO) tornam os seus produtos citáveis no ChatGPT, no Perplexity e nas AI Overviews do Google.',
        },
        {
          title: 'Shopify ou totalmente personalizada',
          desc: 'Construímos no Shopify quando faz sentido e de forma totalmente personalizada em Next.js quando não faz. A decisão vem do seu catálogo e das suas margens, não das nossas preferências.',
        },
      ],
      caseStudy: {
        heading: 'Estudo de caso',
        name: 'Exotic Ripz, cards colecionáveis',
        result: '$191.042 em vendas em 1.790 pedidos',
        body: 'Uma loja Shopify completa para uma marca de comunidade de cards colecionáveis: branding animado e ousado, integração com o Discord e várias redes sociais, categorização inteligente de produtos e captura de e-mails otimizada para conversão. Os lançamentos de booster packs esgotavam consistentemente em poucas horas, e o sistema de envio foi configurado de ponta a ponta.',
        linkLabel: 'Ler o estudo de caso completo',
      },
      faqHeading: 'Perguntas comuns',
      faqs: [
        {
          q: 'Vocês constroem no Shopify ou de forma personalizada?',
          a: 'Os dois. O Shopify é a escolha certa para a maioria dos negócios de produtos; lojas totalmente personalizadas em Next.js fazem sentido para catálogos incomuns, assinaturas ou quando as taxas da plataforma deixam de compensar a conveniência. Recomendamos com base nos seus números.',
        },
        {
          q: 'Quanto custa uma loja online?',
          a: 'Orçada de acordo com o escopo após uma conversa gratuita de 15 minutos, com preço fixo e entregas definidas antes de começarmos. O tamanho da loja, as integrações e as necessidades de migração determinam o valor.',
        },
        {
          q: 'Vocês conseguem migrar a minha loja atual?',
          a: 'Sim. Produtos, clientes e histórico de pedidos podem ser migrados da maioria das plataformas. Planejamos a migração para que a loja nunca saia do ar durante a troca.',
        },
        {
          q: 'Por que não usar simplesmente um construtor de lojas com IA?',
          a: 'Lojas geradas automaticamente parecem boas e convertem mal, porque a conversão vive nos detalhes: posição da captura, mecânica de lançamentos, atrito no checkout, schema de produto para a busca por IA. A loja de $191 mil que construímos esgotava lançamentos em horas porque cada um desses detalhes foi projetado, não gerado.',
        },
        {
          q: 'Vocês também configuram envio e pagamentos?',
          a: 'Sim. O projeto da Exotic Ripz incluiu o sistema de envio configurado de ponta a ponta, além de pagamentos, impostos e as partes operacionais que a maioria dos designers deixa para você.',
        },
      ],
      ctaHeading: 'Quer uma loja que vende?',
      ctaBody: 'Conversa gratuita de 15 minutos. Traga os seus números e diremos onde a loja está perdendo receita.',
      ctaButton: 'Agendar conversa gratuita',
    },
  },
  consent: 'Sim, o Blok Blok Studio pode me enviar por e-mail dicas práticas de crescimento e ofertas ocasionais. Enviaremos um e-mail de confirmação, e você só passa a estar inscrito depois de clicar no link que ele contém. Cancele a inscrição a qualquer momento.',
};

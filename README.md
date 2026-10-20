# Retr0DedSec0 // PS4

**Host de PS4 do Retr0.** Funciona offline, com um fluxo de exploit para cada firmware e GoldHEN incluído.

![Plataforma](https://img.shields.io/badge/plataforma-PlayStation%204-1f2124?style=flat-square)
![Firmware](https://img.shields.io/badge/firmware-5.05%20a%2013.52-1f2124?style=flat-square)
![Modo](https://img.shields.io/badge/modo-offline-1f2124?style=flat-square)

> [!NOTE]
> Projeto para fins educacionais, de preservação e pesquisa. Use por sua conta e risco. Não tem relação com a Sony Interactive Entertainment.

Esta é uma coleção de páginas estáticas para o navegador do PS4. Você abre uma página, escolhe o firmware do console e segue o fluxo certo de exploit e GoldHEN. Foi feita para rodar em hospedagem estática e funcionar offline depois do cache.

## Acesso rápido

No navegador do PS4, abra:

```
https://retr0dedsec0.github.io
```

Escolha o firmware do seu console, siga as instruções da página e, se quiser, salve o endereço nos favoritos para abrir com um toque.

## Índice

- [Firmwares suportados](#firmwares-suportados)
- [Como usar](#como-usar)
- [Versões do GoldHEN](#versões-do-goldhen)
- [Ferramentas de payload](#ferramentas-de-payload)
- [Cache offline](#cache-offline)
- [Visual](#visual)
- [Problemas comuns](#problemas-comuns)
- [Segurança e limitações](#segurança-e-limitações)
- [Créditos](#créditos)

## Firmwares suportados

| Firmware | Página de entrada | Fluxo | GoldHEN | Payloads de utilidade |
|---|---|---|---|---|
| **13.02 a 13.52** | `1352/index.html` | SlopKit WebKit | `v2.4b18.12` | Só o payload principal |
| **11.00 a 12.02 e 12.50 a 13.00** | `1300/index.html` | SlopKit WebKit (Lapse / Poops) | `v2.4b18.12` | Só o payload principal |
| **6.00 a 11.02** | `css/version-selector.html` | CSSFontFace + Lapse/NetCtrl | `stable` ou `latest` | Sem menu separado |
| **9.00 a 9.60** | `900/version-selector.html` | PSFree + Lapse | Seletor de versão | Incluídos |
| **7.00 a 8.52** | `700/version-selector.html` | PSFree + Lapse | Seletor de versão | Incluídos |
| **6.72** | `672/index.html` | Host dedicado | Direto na página | Incluídos |
| **5.05** | `505/index.html` | Host dedicado | Direto na página | Incluídos |

A página inicial lista todas as opções. Use sempre o host do firmware exato que está instalado no console.

Proteção contra execução repetida: as cadeias da pasta 1300 verificam o `getuid` depois da etapa inicial e param com a mensagem `ALREADY JAILBROKEN` se o console já estiver com jailbreak. Os hosts 700 e 900 consultam o status do GoldHEN (`http://127.0.0.1:9090/status`) por 1,5 s e pulam o exploit se ele responder. Reabrir um host depois do sucesso é seguro.

## Como usar

1. Sirva a raiz do repositório por HTTP ou HTTPS (por exemplo, no GitHub Pages). O navegador do PS4 não roda o fluxo completo a partir de `file://`.
2. Abra o `index.html` da raiz no navegador do PS4.
3. Escolha o firmware que corresponde ao seu console.
4. Se a rota tiver seletor de GoldHEN, escolha **Latest** ou **Stable** e espere a página de cache terminar.
5. Na página do host, espere a mensagem de pronto antes de iniciar o exploit.
6. Depois que o GoldHEN carregar, use apenas as ferramentas que aquele host oferece.

No host CSSFontFace, o **Auto Jailbreak** vem ligado. A página faz uma contagem de cinco segundos e roda a cadeia sozinha, ou você aperta `Jailbreak` quando quiser. Durante a contagem dá para trocar entre `Lapse` e `NetCtrl` ou desligar o automático (a escolha fica salva no `localStorage`). Na primeira visita a contagem espera o cache terminar de instalar. Se o cache der erro, a página pede o início manual.

## Versões do GoldHEN

O repositório traz duas versões, onde o host permite escolher:

- **GoldHEN v2.4b18.12**, a versão mais nova.
- **GoldHEN v2.4b18.10**, a versão anterior.

Os hosts 7.00 a 8.52 e 9.00 a 9.60 escolhem a versão no seletor e na página de cache. O host CSSFontFace usa `css/version-selector.html`, que leva a:

- `css/latest/index.html` para a v2.4b18.12;
- `css/stable/index.html` para a v2.4b18.10.

## Ferramentas de payload

A lista depende do firmware. Dependendo da rota, o host oferece:

- FTP Server
- PS4Debug
- App2USB
- Backup e Restore
- Enable Updates e Disable Updates
- AppCache Install
- History Blocker
- PUP Decrypt
- RIF Renamer
- PSFree Fix (nos hosts PSFree)
- WebRTE (nos hosts que incluem)
- Kernel Clock (no host que oferece)

Os botões carregam o binário escolhido pelo carregador do próprio host e podem precisar de um receptor de payload na mesma rede.

**Host CSSFontFace.** Ele não tem menu de utilidades, de propósito: o exploit usa muita memória, e tirar as ferramentas extras ajuda a deixar o jailbreak mais estável. A interface mostra o log colorido (info, erro e debug), a escolha entre Lapse e NetCtrl, o Auto Jailbreak com contagem, o botão `Jailbreak` manual, o botão `Reload` para recuperar depois de uma falha e o carregamento automático do GoldHEN escolhido. O binário interno que esse fluxo precisa continua lá, mas não é uma ferramenta que o usuário escolhe.

## Cache offline

Todos os hosts usam caminhos relativos e cache de aplicação do navegador. **Não renomeie nem mova as pastas de firmware** depois de publicar.

| Rota | Como o cache funciona |
|---|---|
| **5.05** | `505/cache.manifest` fica ligado à página, que mostra o progresso. |
| **6.72** | `672/cache.manifest` fica ligado à página, que mostra o progresso. |
| **7.00 a 8.52** | Escolha a versão em `700/version-selector.html` e use `cache.html` ou `cache5.html` para instalar `PSPulse.cache` ou `PSPulse5.cache`. |
| **9.00 a 9.60** | Escolha a versão em `900/version-selector.html` e use `cache.html` ou `cache5.html` para instalar `PSPulse.manifest` ou `PSPulse5.manifest`. |
| **CSSFontFace** | Escolha a versão em `css/version-selector.html`. A página `stable` ou `latest` tem seu próprio `cache.manifest`, com hash SHA-256 por arquivo. |
| **1300** | Abra `1300/index.html`. A versão atual fica direto em `1300/` e instala o próprio `cache.manifest` sozinha. |
| **1352** | Abra `1352/index.html`. A página instala o próprio `cache.manifest` sozinha, e atualizações de cache pedem um toque para recarregar. |

Depois da primeira instalação do cache, feche e abra de novo o navegador do PS4 quando a página mandar. Se ainda aparecer um layout ou script antigo, limpe os dados do navegador para o site e repita a instalação.

Os arquivos de cache são gerados. Sempre que mudar um HTML, JavaScript, binário ou patch que esteja na lista de cache, atualize o manifest ou o hash correspondente e teste a primeira carga e a carga em cache separadamente. O repositório inclui pequenos scripts para gerar esses arquivos.

## Visual

A página inicial tem a cara do Retr0: estilo DedSec retrô, feito para ser lido de longe, na TV, e para o WebKit antigo do PS4.

- **Cores:** fundo quase preto `#08080b`, painel `#131217`, texto `#f1eee8`, rosa `#ff2e88` e ciano `#36e2ff`. As duas últimas formam o efeito de glitch.
- **Identidade:** barra de terminal com cursor piscando, linhas de boot, caveira em pixel fatiada em faixas deslocadas (SVG) e o nome Retr0DedSec0 escrito em hexadecimal no rodapé. Linhas de varredura de CRT no fundo.
- **Estrutura:** uma rota em destaque, que é o firmware do dono do host (13.02 a 13.52), e uma lista com as demais.
- **Controle em primeiro lugar:** todo item interativo é um elemento focável de verdade, com anel de foco ciano. O foco inicial vai para a rota principal.
- **Leve:** sem frameworks, fontes externas, transições, animações ou `backdrop-filter`. O glitch é só `text-shadow` e faixas deslocadas no SVG, as linhas de CRT são um gradiente fixo, e o único movimento é o cursor do terminal.

As páginas internas de cada firmware mantêm o visual original do projeto.

## Problemas comuns

**Aparece uma página antiga ou errada.** Limpe os dados do navegador do PS4 para o site, feche e abra o navegador e comece pela página inicial. Confira se o cache da rota tem os caminhos relativos atuais.

**O cache nunca termina.** Confirme que o site é servido por HTTP/HTTPS, que o manifest tem o tipo MIME correto e que todos os arquivos listados existem nos caminhos exatos. Um cache antigo pode sobreviver a recarregamentos normais, então limpe os dados do site antes de tentar de novo.

**O exploit não completa.** Confira o firmware e a rota escolhida, feche outras abas e tente de novo a partir de um navegador limpo. No CSSFontFace, depois de qualquer falha use `Reload`, e não rode a cadeia de novo por cima de um estado sujo. A taxa de sucesso varia com a memória do navegador, o cache e as condições do console.

**Falta de memória durante o exploit ("not enough RAM").** No CSSFontFace isso é variação normal, e várias falhas seguidas acontecem. Para aumentar a chance:

1. Instale o cache e depois **feche totalmente o navegador do PS4**, sem só navegar para outra página.
2. Reabra o navegador com **somente** a página do host e não mexa em nada enquanto roda.
3. Deixe a contagem automática rodar sozinha e não mexa no cursor durante a execução.
4. Depois de qualquer falha, use **Reload**.
5. Se uma cadeia falhar sempre por memória no seu firmware, tente a outra (`Lapse` ou `NetCtrl`).

Aumentar tempos limite não ajuda, e não altere os tamanhos de spray nem o número de tentativas: são valores ajustados pelos pesquisadores originais.

**O navegador do PS4 trava.** O JavaScript não consegue recuperar um navegador travado. Feche e abra de novo o navegador e carregue o host certo. Não adicione laços de nova tentativa, porque eles pioram a instabilidade.

**Um payload de utilidade não responde.** Espere o host avisar que o fluxo de exploit e GoldHEN está pronto. Confirme que o host tem aquela utilidade, que o PS4 e o receptor de payload estão na mesma rede e que o receptor está na porta certa. O host CSSFontFace não tem botões de utilidade.

## Segurança e limitações

- Use apenas o host do firmware exato do console.
- Não interrompa o console durante exploit, carregamento do GoldHEN, payload ou operação do sistema.
- Mantenha um caminho de recuperação e backups atuais antes de usar backup, restauração ou utilidades do sistema.
- Não use as páginas de exploit para acessar a PSN ou outros serviços online.
- Um payload incluído localmente não é inofensivo por isso. Leia o que cada utilidade faz antes de carregar.
- O fluxo CSSFontFace é muito sensível à memória do navegador, e a ausência das utilidades extras é uma troca consciente por estabilidade.
- A rota 11.00 a 12.02 e 12.50 a 13.00 é de pesquisa e não garante estabilidade. As versões 12.03 a 12.49 não têm bug funcional na origem.
- Nenhum host garante o mesmo resultado em todo console, versão do navegador, estado de cache ou rede.

## Créditos

Este host é baseado no projeto **PlayStation Pulse**, de BlackArch. Os exploits, payloads e a estrutura técnica são do projeto original.

| Função | Quem |
|---|---|
| Autor original | [BlackArch](https://t.me/sudoBlackArch) |
| Comunidade | [PlayStation Pulse](https://t.me/PlayStation_Pulse) |
| Servidores de jogos | [NodePlay](https://nodeplay.net/) |
| Personalização visual e manutenção desta versão | Retr0 (Davi Moreno) |

> Para qualquer uso dos materiais ou arquivos, os links do autor [BlackArch](https://t.me/sudoBlackArch) e do grupo [PlayStation Pulse](https://t.me/PlayStation_Pulse) no Telegram devem permanecer em todas as páginas.

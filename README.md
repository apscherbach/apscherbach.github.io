# APS — Adriano Scherbach

Site estático com interface em português, inglês e espanhol. Recriado a partir de `apscherbach.github.io`, mantendo as seções Início, Cursos e Depoimentos, os quatro cursos e os seis depoimentos publicados. O diretório original permanece intacto.

## Visualizar

Execute `python3 -m http.server 4173` na raiz e abra `http://localhost:4173`. Também é possível abrir `index.html` diretamente; o site não depende de CDN, instalação de pacotes ou compilação.

## Conteúdo

- `index.html`: conteúdo e links de venda, incluindo os cupons originais.
- `src/lang/courses.json`: registro dos dados preservados dos cursos para consulta. A página usa o conteúdo HTML; ao atualizar o catálogo, mantenha ambos sincronizados.
- `src/lang/translations.json`: traduções editáveis. Após editar, execute `python3 scripts/sync_translations.py` para atualizar o JavaScript usado pela página.
- `src/styles/styles.css`: design e layouts responsivos.
- `src/javascript/script.js`: idioma persistente, filtros e navegação.

As aulas continuam indicadas como português nos três idiomas da interface. Depoimentos são mantidos em português, sem alterar o texto dos alunos. Preços e cupons correspondem ao catálogo de origem; sua validade deve ser confirmada na Udemy.

## Publicação

O conteúdo da raiz está pronto para hospedagem estática, inclusive GitHub Pages. Não foi publicado automaticamente.

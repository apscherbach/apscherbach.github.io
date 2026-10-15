# APS — Adriano Scherbach

Site estático com interface em português, inglês e espanhol. 

## Conteúdo

- `index.html`: conteúdo e links de venda, incluindo os cupons originais.
- `src/lang/courses.json`: registro dos dados preservados dos cursos para consulta. A página usa o conteúdo HTML; ao atualizar o catálogo, mantenha ambos sincronizados.
- `src/lang/translations.json`: traduções editáveis. Após editar, execute `python3 scripts/sync_translations.py` para atualizar o JavaScript usado pela página.
- `src/styles/styles.css`: design e layouts responsivos.
- `src/javascript/script.js`: idioma persistente, filtros e navegação.


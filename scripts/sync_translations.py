"""Generate the browser translation bundle from the editable JSON source."""
import json
from pathlib import Path
root = Path(__file__).resolve().parent.parent
translations = json.loads((root / 'src/lang/translations.json').read_text())
(root / 'src/lang/translations.js').write_text('window.APS_TRANSLATIONS = ' + json.dumps(translations, ensure_ascii=False) + ';\n')

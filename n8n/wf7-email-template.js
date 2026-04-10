function md(t) {
  return t
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e85c2a;font-weight:700;">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#2D5A27;font-weight:600;text-decoration:underline;">$1</a>')
    .replace(/([A-Z]{3,}[0-9]{1,2})/g, '<strong style="color:#e85c2a;font-size:18px;font-weight:900;letter-spacing:1px;background:#fff3e0;padding:2px 6px;border-radius:3px;">$1</strong>');
}
function limitParagraphs(text, max) {
  var paras = text.split(/\n\n+/).filter(function(p){ return p.trim(); });
  if (paras.length <= 1) {
    paras = text.split(/\n/).filter(function(p){ return p.trim(); });
  }
  return paras.slice(0, max).join('\n\n');
}
function wrap(body) {
  body = limitParagraphs(body, 3);
  var ps = body.split('\n').map(function(l){
    l = l.trim();
    return l ? '<p style="font-family:Georgia,serif;font-size:18px;line-height:2.1;color:#1A1A1A;margin:0 0 28px 0;">' + md(l) + '</p>' : '';
  }).join('');
  var html = '';

  html += '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">';
  html += '<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">';

  // GREEN HEADER
  html += '<tr><td style="background:#2D5A27;padding:32px 32px 26px;text-align:center;">';
  html += '<img src="https://lovecrafteatery.com/brand/rs-logo-text.png" alt="Root Soulutions" height="72" style="height:72px;width:auto;max-width:300px;">';
  html += '<p style="margin:12px 0 0;color:#F5C542;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;">Whole-food seasonings crafted with SOUL</p>';
  html += '</td></tr>';

  // GOLD BAR
  html += '<tr><td style="background:#F5C542;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>';

  // SPICE ICONS
  html += '<tr><td style="background:#FFF8F0;padding:20px 32px 12px;text-align:center;">';
  html += '<img src="https://lovecrafteatery.com/brand/beetroot-small.png" alt="" height="40" style="height:40px;width:auto;margin:0 10px;">';
  html += '<img src="https://lovecrafteatery.com/brand/chili-pepper.png" alt="" height="40" style="height:40px;width:auto;margin:0 10px;">';
  html += '<img src="https://lovecrafteatery.com/brand/garlic-illustration.png" alt="" height="40" style="height:40px;width:auto;margin:0 10px;">';
  html += '<img src="https://lovecrafteatery.com/brand/onion-turmeric-illustration.png" alt="" height="40" style="height:40px;width:auto;margin:0 10px;">';
  html += '</td></tr>';

  // DIVIDER
  html += '<tr><td style="background:#FFF8F0;padding:8px 40px 0;"><div style="border-top:1px solid rgba(45,90,39,0.2);"></div></td></tr>';

  // BODY TEXT
  html += '<tr><td style="background:#FFF8F0;padding:36px 52px 8px;">';
  html += ps;
  html += '</td></tr>';

  // SHOP NOW + NAV + FOOTER all in one cell
  html += '<tr><td style="background:#FFF8F0;padding:8px 52px 40px;text-align:center;">';
  html += '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;"><tr><td align="center">';
  html += '<a href="https://lovecrafteatery.com/shop" style="display:inline-block;background:#e85c2a;color:#ffffff;font-family:Impact,Arial,sans-serif;font-size:17px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:18px 64px;border-radius:9999px;">SHOP NOW &#8594;</a>';
  html += '</td></tr></table>';
  html += '<p style="margin:0 0 8px;text-align:center;font-family:Arial,sans-serif;font-size:12px;color:#555555;">';
  html += '<a href="https://lovecrafteatery.com/shop" style="color:#2D5A27;text-decoration:none;">Shop</a>';
  html += ' &middot; <a href="https://lovecrafteatery.com/recipes" style="color:#2D5A27;text-decoration:none;">Recipes</a>';
  html += ' &middot; <a href="https://lovecrafteatery.com/markets" style="color:#2D5A27;text-decoration:none;">Markets</a>';
  html += ' &middot; <a href="https://lovecrafteatery.com/about" style="color:#2D5A27;text-decoration:none;">Our Story</a>';
  html += '</p>';
  html += '<p style="margin:0 0 8px;text-align:center;font-family:Arial,sans-serif;font-size:11px;color:#888888;">Root Soulutions &middot; A Craft Eatery Brand &middot; Greensboro, NC</p>';
  html += '<p style="margin:0;text-align:center;">';
  html += '<a href="https://lovecrafteatery.com/unsubscribe" style="color:#e85c2a;font-family:Arial,sans-serif;font-size:12px;font-weight:700;text-decoration:underline;">Unsubscribe</a>';
  html += ' &middot; <a href="https://lovecrafteatery.com/privacy" style="color:#888888;font-family:Arial,sans-serif;font-size:11px;text-decoration:none;">Privacy Policy</a>';
  html += '</p>';
  html += '</td></tr>';

  // ORANGE STRIPE
  html += '<tr><td style="background:#e85c2a;height:5px;font-size:0;line-height:0;">&nbsp;</td></tr>';

  html += '</table></td></tr></table>';
  return html;
}

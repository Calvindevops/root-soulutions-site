import json, requests

API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMzIxYWRlNi04NTBmLTQ5Y2QtOWNkOS0xODY4MGMwZjk5N2QiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNTI4ZGI1YTktZDc3Ni00ODljLTgxMTktY2Q2NDc0M2Q4NDVmIiwiaWF0IjoxNzc1ODYyMTA4fQ.hDsrFkomjpH4J01M7Z46TvrPLLvMIc6PuH7shjEi5cA"
BASE = "https://n8n-io-production-9f8e.up.railway.app"
WF_ID = "U58bEnvGzBdv7Svt"

with open("/tmp/wf7_shared.js") as f:
    SHARED_JS = f.read()

NODE_TAILS = {
    "Code — Build Education Email": """var body = $('Claude — Monday Education').first().json.text || '';
body = body.split('\\n').filter(function(l){return !l.trim().match(/^#+\\s/);}).join('\\n').trim();
var seg = $('Code — Segment Subscribers').first().json;
var all = (seg.segments.new_subscriber || []).concat(seg.segments.returning || []);
var to = all.filter(function(s){return s.email;}).map(function(s){return {email:s.email,name:s.name||'Friend'};});
if (!to.length) return [];
return [{json:{sender:{name:'Root Soulutions',email:'contact@lovecrafteatery.com'},to:to,subject:'What Makes Root Soulutions Different',htmlContent:wrap(body)}}];""",

    "Code — Build Market Email": """var body = $('Claude — Monday Market').first().json.text || '';
body = body.split('\\n').filter(function(l){return !l.trim().match(/^#+\\s/);}).join('\\n').trim();
var seg = $('Code — Segment Subscribers').first().json;
var all = (seg.segments.new_subscriber || []).concat(seg.segments.returning || []);
var to = all.filter(function(s){return s.email;}).map(function(s){return {email:s.email,name:s.name||'Friend'};});
if (!to.length) return [];
return [{json:{sender:{name:'Root Soulutions',email:'contact@lovecrafteatery.com'},to:to,subject:'Find Us at the Market This Week',htmlContent:wrap(body)}}];""",

    "Code — Build Recipe Email": """var body = $('Claude — Wednesday Recipe').first().json.text || '';
body = body.split('\\n').filter(function(l){return !l.trim().match(/^#+\\s/);}).join('\\n').trim();
var seg = $('Code — Segment Subscribers').first().json;
var all = (seg.segments.new_subscriber || []).concat(seg.segments.returning || []);
var to = all.filter(function(s){return s.email;}).map(function(s){return {email:s.email,name:s.name||'Friend'};});
if (!to.length) return [];
return [{json:{sender:{name:'Root Soulutions',email:'contact@lovecrafteatery.com'},to:to,subject:"Tonight's Recipe from Root Soulutions",htmlContent:wrap(body)}}];""",

    "Code — Build Loyal Email": """var body = $('Claude — Friday Loyal').first().json.text || '';
body = body.split('\\n').filter(function(l){return !l.trim().match(/^#+\\s/);}).join('\\n').trim();
var seg = $('Code — Segment Subscribers').first().json;
var all = seg.segments.returning || [];
var to = all.filter(function(s){return s.email;}).map(function(s){return {email:s.email,name:s.name||'Friend'};});
if (!to.length) return [];
return [{json:{sender:{name:'Root Soulutions',email:'contact@lovecrafteatery.com'},to:to,subject:'A Special Thank You — 15% Off Just for You',htmlContent:wrap(body)}}];""",

    "Code — Build Intro Email": """var body = $('Claude — Friday Intro').first().json.text || '';
body = body.split('\\n').filter(function(l){return !l.trim().match(/^#+\\s/);}).join('\\n').trim();
var seg = $('Code — Segment Subscribers').first().json;
var all = seg.segments.new_subscriber || [];
var to = all.filter(function(s){return s.email;}).map(function(s){return {email:s.email,name:s.name||'Friend'};});
if (!to.length) return [];
return [{json:{sender:{name:'Root Soulutions',email:'contact@lovecrafteatery.com'},to:to,subject:'Welcome Gift: 10% Off Your First Order (Code: WELCOME10)',htmlContent:wrap(body)}}];"""
}

r = requests.get(f"{BASE}/api/v1/workflows/{WF_ID}", headers={"X-N8N-API-KEY": API_KEY})
wf = r.json()
print("Fetched:", wf.get("name"))

patched = 0
for node in wf["nodes"]:
    if node.get("name") in NODE_TAILS and node.get("type") == "n8n-nodes-base.code":
        node["parameters"]["jsCode"] = SHARED_JS + "\n" + NODE_TAILS[node["name"]]
        patched += 1
        print("  Patched:", node["name"])

put_body = {
    "name": wf["name"],
    "nodes": wf["nodes"],
    "connections": wf["connections"],
    "settings": {"executionOrder": "v1"},
    "staticData": wf.get("staticData")
}

r2 = requests.put(
    f"{BASE}/api/v1/workflows/{WF_ID}",
    headers={"X-N8N-API-KEY": API_KEY, "Content-Type": "application/json"},
    json=put_body
)
print(f"Deploy: {r2.status_code} | Patched: {patched}/5")
if r2.status_code != 200:
    print(r2.text[:400])

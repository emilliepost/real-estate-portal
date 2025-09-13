import fs from "fs";

function ensureForceDynamic(file) {
  const line = "export const dynamic = 'force-dynamic'";
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes(line)) {
    fs.writeFileSync(file, line + "\n" + s);
    console.log("prepended:", file);
  } else {
    console.log("already set:", file);
  }
}

ensureForceDynamic("src/app/page.tsx");
ensureForceDynamic("src/app/project/[slug]/page.tsx");

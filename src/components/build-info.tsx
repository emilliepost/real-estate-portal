export default function BuildInfo() {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA || "local"
  const env = process.env.VERCEL_ENV || "dev"
  const short = sha.slice(0, 7)
  return (
    <span className="text-xs text-muted-foreground">
      build: <span className="font-mono">{short}</span> · {env}
    </span>
  )
}

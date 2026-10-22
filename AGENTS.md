<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Store replacement uploaded video media as Lovable Assets pointers so the same media URLs work in preview and hosted deployments.
- Vercel deployments must proxy `/__l5e/assets-v1/*` to this project's verified Lovable asset-serving origin through `vercel.json`; external hosts do not provide that media endpoint themselves.
- Keep date-reveal completion in the invitation page, with Dates reporting completion, so the existing countdown is rendered once immediately after Dates.
- Phone video framing uses the loaded video's intrinsic aspect ratio through `--video-aspect`; keep these presentation overrides in the global stylesheet so desktop layout remains unchanged.

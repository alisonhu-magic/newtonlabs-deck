-- Render output/deck.pptx to output/keynote.pdf using Keynote itself, so the
-- validation renders match the actual editor a macOS user opens the file in.
-- (LibreOffice is also fine for CI; see package.json.)
set projPOSIX to (do shell script "pwd")
set inPath to projPOSIX & "/output/deck.pptx"
set outPath to projPOSIX & "/output/keynote.pdf"
do shell script "rm -f " & quoted form of outPath
tell application "Keynote"
  activate
  set d to open (POSIX file inPath)
  delay 4
  export d to (POSIX file outPath) as PDF
  delay 2
  close d saving no
end tell
return "rendered " & outPath

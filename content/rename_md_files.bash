# Rename all *.txt to *.text
for file in *.md; do
    mv -- "$file" "${file%.txt}.mdx"
done
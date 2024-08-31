import os
import re
import yaml
import tiktoken

def get_markdown_files(directory):
    markdown_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md') or file.endswith('.mdx'):
                markdown_files.append(os.path.join(root, file))
    return markdown_files


def extract_content(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        
        # Extract front matter
        front_matter_match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
        if front_matter_match:
            front_matter = yaml.safe_load(front_matter_match.group(1))
            # date = front_matter.get('date', 'No date')
            title = front_matter.get('title', 'No title')
            heading = f"#{title}\n\n"
        else:
            heading = "# No date - No title\n\n"
        
        # Remove front matter
        content = re.sub(r'^---\n.*?---\n', '', content, flags=re.DOTALL)
        
        # Remove HTML tags
        content = re.sub(r'<[^>]+>', '', content)
        # Remove import statements
        content = re.sub(r'^import.*$', '', content, flags=re.MULTILINE)
        # Remove JavaScript code blocks
        content = re.sub(r'```js.*?```', '', content, flags=re.DOTALL)
        # Remove inline JavaScript
        content = re.sub(r'{`.*?`}', '', content)
        # Remove image links
        content = re.sub(r'!\[.*?\]\(.*?\)', '', content)
        
        return heading + content.strip()

def merge_files(files, output_file):
    total_content = ""
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for file_path in files:
            content = extract_content(file_path)
            outfile.write(content + '\n\n')
            total_content += content + '\n\n'
    return total_content

def count_stats(content):
    char_count = len(content)
    word_count = len(content.split())
    
    # Count tokens using tiktoken
    enc = tiktoken.encoding_for_model("gpt-4")
    token_count = len(enc.encode(content))
    
    return char_count, word_count, token_count

def main():
    content_dir = 'content'
    journal_dir = os.path.join(content_dir, 'journal')
    posts_dir = os.path.join(content_dir, 'posts')
    output_file = 'writings.txt'

    print(journal_dir)
    print(posts_dir)

    journal_files = get_markdown_files(journal_dir)
    posts_files = get_markdown_files(posts_dir)
    all_files = journal_files + posts_files

    total_content = merge_files(all_files, output_file)
    print(f"All content has been merged into {output_file}")

    char_count, word_count, token_count = count_stats(total_content)

    print(f"All content has been merged into {output_file}")
    print(f"Total characters: {char_count}")
    print(f"Total words: {word_count}")
    print(f"Total tokens (GPT-4): {token_count}")

if __name__ == '__main__':
    main()
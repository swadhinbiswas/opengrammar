#!/usr/bin/env python3
"""
Markdown to HTML Converter for OpenGrammar Documentation
Converts all .md files in docs/ folder to beautiful HTML pages
"""

import os
import re
from datetime import datetime

def convert_markdown_to_html(md_content, title="OpenGrammar Documentation"):
    """Convert markdown content to HTML with proper styling"""
    
    # Basic markdown conversions
    html = md_content
    
    # Headers
    html = re.sub(r'^# (.*?)$', r'<h1 class="text-4xl font-bold mb-6">\1</h1>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.*?)$', r'<h2 class="text-2xl font-bold mt-8 mb-4">\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^### (.*?)$', r'<h3 class="text-xl font-bold mt-6 mb-3">\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^#### (.*?)$', r'<h4 class="text-lg font-bold mt-4 mb-2">\1</h4>', html, flags=re.MULTILINE)
    
    # Bold and italic
    html = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html)
    html = re.sub(r'\*(.*?)\*', r'<em>\1</em>', html)
    
    # Code blocks
    html = re.sub(r'```(\w+)?\n(.*?)```', r'<pre class="bg-gray-800 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto"><code>\2</code></pre>', html, flags=re.DOTALL)
    
    # Inline code
    html = re.sub(r'`(.*?)`', r'<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-red-600 dark:text-red-400">\1</code>', html)
    
    # Links
    html = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2" class="text-blue-600 dark:text-blue-400 hover:underline">\1</a>', html)
    
    # Images
    html = re.sub(r'!\[(.*?)\]\((.*?)\)', r'<img src="\2" alt="\1" class="max-w-full h-auto rounded-lg my-4">', html)
    
    # Unordered lists
    html = re.sub(r'^[-*] (.*?)$', r'<li class="mb-2">\1</li>', html, flags=re.MULTILINE)
    html = re.sub(r'(<li.*?</li>\n)+', r'<ul class="list-disc list-inside mb-4">\g<0></ul>', html)
    
    # Ordered lists
    html = re.sub(r'^\d+\. (.*?)$', r'<li class="mb-2">\1</li>', html, flags=re.MULTILINE)
    
    # Blockquotes
    html = re.sub(r'^> (.*?)$', r'<blockquote class="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400">\1</blockquote>', html, flags=re.MULTILINE)
    
    # Horizontal rules
    html = re.sub(r'^---$', r'<hr class="my-8 border-gray-300 dark:border-gray-700">', html, flags=re.MULTILINE)
    
    # Paragraphs
    html = re.sub(r'^(?!<[hulobc]|<hr|<pre|<img|<div)(.+)$', r'<p class="mb-4">\1</p>', html, flags=re.MULTILINE)
    
    # Tables (basic conversion)
    html = re.sub(r'\|(.+?)\|', r'<tr><td>\1</td></tr>', html)
    
    return html

def create_html_page(content, title="OpenGrammar Documentation"):
    """Wrap content in HTML template"""
    
    template = f'''<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | OpenGrammar</title>
    <meta name="description" content="OpenGrammar Documentation">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {{
            darkMode: 'class',
            theme: {{
                extend: {{
                    colors: {{
                        primary: {{
                            50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
                            400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb',
                            700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
                        }},
                        dark: {{
                            50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
                            400: '#94a3b8', 500: '#64748b', 600: '#475569',
                            700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617',
                        }}
                    }}
                }}
            }}
        }}
    </script>
    <style>
        * {{ transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; }}
        ::-webkit-scrollbar {{ width: 10px; }}
        ::-webkit-scrollbar-track {{ background: #f1f5f9; }}
        .dark ::-webkit-scrollbar-track {{ background: #1e293b; }}
        ::-webkit-scrollbar-thumb {{ background: #94a3b8; border-radius: 5px; }}
        ::-webkit-scrollbar-thumb:hover {{ background: #64748b; }}
    </style>
</head>
<body class="font-sans antialiased bg-white dark:bg-dark-950 text-gray-900 dark:text-gray-100">

    <!-- Navigation -->
    <nav class="fixed w-full z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <a href="../index.html" class="flex items-center gap-2">
                    <img src="../logo.svg" alt="OpenGrammar Logo" class="h-8 w-8">
                    <span class="font-bold text-xl tracking-tight">OpenGrammar Docs</span>
                </a>
                <div class="flex items-center gap-4">
                    <button id="theme-toggle" class="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700" aria-label="Toggle dark mode">
                        <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                        </svg>
                        <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                    </button>
                    <a href="../index.html" class="text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400">Back to Docs</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <article class="prose prose-lg dark:prose-invert max-w-none">
            {content}
        </article>
        
        <!-- Back to Top -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-dark-700">
            <a href="#" class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                Back to top
            </a>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="flex items-center gap-2">
                    <img src="../logo.svg" alt="OpenGrammar Logo" class="h-6 w-6">
                    <span class="text-sm text-gray-600 dark:text-gray-400">© 2026 OpenGrammar. Apache 2.0 License</span>
                </div>
                <div class="flex gap-6">
                    <a href="https://github.com/swadhinbiswas/opengrammar" class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">GitHub</a>
                    <a href="../index.html" class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Home</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Theme Script -->
    <script>
        const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (theme === 'dark') document.documentElement.classList.add('dark');
        
        function updateThemeIcons() {{
            const isDark = document.documentElement.classList.contains('dark');
            document.getElementById('theme-toggle-light-icon').classList.toggle('hidden', !isDark);
            document.getElementById('theme-toggle-dark-icon').classList.toggle('hidden', isDark);
        }}
        updateThemeIcons();
        
        document.getElementById('theme-toggle').addEventListener('click', function() {{
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
            updateThemeIcons();
        }});
    </script>
</body>
</html>'''
    
    return template

def main():
    """Convert all markdown files to HTML"""
    docs_dir = 'docs'
    
    # Get all markdown files
    md_files = [f for f in os.listdir(docs_dir) if f.endswith('.md')]
    
    print(f"Found {len(md_files)} markdown files to convert")
    
    for md_file in md_files:
        md_path = os.path.join(docs_dir, md_file)
        html_filename = md_file.replace('.md', '.html')
        html_path = os.path.join(docs_dir, html_filename)
        
        # Read markdown content
        with open(md_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Extract title from first heading
        title_match = re.search(r'^# (.+)$', md_content, re.MULTILINE)
        title = title_match.group(1) if title_match else "OpenGrammar Documentation"
        
        # Convert markdown to HTML
        html_content = convert_markdown_to_html(md_content, title)
        
        # Create full HTML page
        html_page = create_html_page(html_content, title)
        
        # Write HTML file
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html_page)
        
        print(f"✓ Converted {md_file} → {html_filename}")
    
    print(f"\n✅ Conversion complete! {len(md_files)} files converted to HTML")

if __name__ == '__main__':
    main()

import zipfile
import xml.etree.ElementTree as ET
import os

def get_docx_text(path):
    if not os.path.exists(path):
        return f"File not found: {path}"
    try:
        document = zipfile.ZipFile(path)
        xml_content = document.read('word/document.xml')
        document.close()
        tree = ET.fromstring(xml_content)
        
        paragraphs = []
        for paragraph in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
            paragraphs.append(paragraph.text)
        
        return " ".join(paragraphs)
    except Exception as e:
        return str(e)

files = [
    "/home/parth/Projects/parthxcore/resume/cybersecurity projects/COMPUTER NETWORK LAB PROJECT (1).docx",
    "/home/parth/Projects/parthxcore/resume/cybersecurity projects/Implementing Security Measures within a Threat Intelligence Sharing Platform (1).docx",
    "/home/parth/Projects/parthxcore/resume/cybersecurity projects/spinaaker report (3).docx",
    "/home/parth/Projects/parthxcore/resume/cybersecurity projects/wps (1).docx"
]

for f in files:
    print(f"--- {os.path.basename(f)} ---")
    text = get_docx_text(f)
    print(text[:2000]) # Get first 2000 chars
    print("\n")

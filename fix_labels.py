import os

path = r'c:\sass\src\lib\site-content.ts'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_line = -1
end_line = -1
for i, line in enumerate(lines):
    if 'const NAVIGATION_LABELS' in line:
        start_line = i
    if start_line != -1 and '};' in line and i > start_line:
        end_line = i
        break

if start_line != -1 and end_line != -1:
    new_labels = [
        'const NAVIGATION_LABELS: Record<SupportedLang, NavigationLabels> = {\n',
        '    ko: { home: "홈", aesthetic: "감성 테스트", color: "퍼스널 컬러", faceShape: "AI 얼굴형 분석", faceShape3D: "3D 입체 분석 (Beta)" },\n',
        '    en: { home: "Home", aesthetic: "Aesthetic Test", color: "Personal Color", faceShape: "AI Face Shape Analysis", faceShape3D: "3D Face Analysis (Beta)" },\n',
        '    zh: { home: "首页", aesthetic: "美学测试", color: "个人色彩", faceShape: "AI 脸型分析", faceShape3D: "3D 脸型分析 (Beta)" },\n',
        '    ja: { home: "ホーム", aesthetic: "感性テスト", color: "퍼스널 컬러", faceShape: "AI 얼굴형 분석", faceShape3D: "3D 얼굴형 분석 (Beta)" },\n',
        '};\n'
    ]
    lines[start_line:end_line+1] = new_labels
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Successfully updated NAVIGATION_LABELS")
else:
    print(f"Failed to find NAVIGATION_LABELS: start={start_line}, end={end_line}")

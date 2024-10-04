from bs4 import BeautifulSoup
import requests
from openai import OpenAI
import json
import random



page_to_scrape = 'https://www.dagens.com/technology/samsung-face-8-000-penalty-over-employee-radiation-case'



class Article:
    def __init__(self, title, category, tags, imageSrc, imageRef, teaser, content):
        self.title = title
        self.category = category
        self.tags = tags
        self.imageSrc = imageSrc
        self.imageRef = imageRef
        self.teaser = teaser
        self.content = content
         
    def __str__(self):
        return f"Title: {self.title}\nCategory: {self.category}\nTags: {self.tags}\nImage Source: {self.imageSrc}\nTeaser: {self.teaser}\nContent: {self.content}"


soup = BeautifulSoup(requests.get(page_to_scrape).content, 'html.parser')

title = soup.find('h1').text
category = soup.find('a', class_='section-element').text
tags = soup.find('a', class_='tags-element').text
imageSrc = soup.find('img', class_='panorama')['src']
imageRef = soup.find('span', class_='attachment-label-element').text
teaser = soup.find('span', class_='teaser-element').text
content = soup.find_all('div', class_='classic')
content_text = ""
for div in content:
    for child in div.find_all(['p', 'a', '[href]', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], recursive=False):
        content_text += child.text + "\n"

article = Article(title, category, tags, imageSrc, imageRef, teaser, content)








SANITY_URL = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v2023-10-03/data/mutate/{SANITY_DATASET}"

# Headers til Sanity API anmodningen
SANITY_HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {SANITY_TOKEN}"
}


image_url = article.imageSrc  # URL til det scraped billede
image_data = requests.get(image_url).content  # Hent billedet

# API URL til Sanity Assets API
sanity_image_url = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v1/assets/images/{SANITY_DATASET}"

# Headers til billed-upload
sanity_image_headers = {
    "Content-Type": "image/webp",  # Ændr denne, hvis billedet er i et andet format
    "Authorization": f"Bearer {SANITY_TOKEN}"
}

# Upload billedet til Sanity
image_response = requests.post(sanity_image_url, headers=sanity_image_headers, data=image_data)

# Tjek om upload var succesfuld
if image_response.status_code == 200:
    print("Billedet blev uploadet succesfuldt.")
    image_id = image_response.json()['document']['_id']  # Få asset-ID'et fra svaret
else:
    print(f"Der opstod en fejl under upload af billedet: {image_response.status_code}")
    print(image_response.json())



prompt = f"""
Du er en professionel DANSK journalist. Din hovedopgave er at generere DANSKE dybdegående, spændende og fangende artikler baseret på modtaget indhold.
Du skal producere en unik artikel, som sikrer, at den er forskellig fra det oprindelige indhold for at undgå duplikationsproblemer med Google.
Artiklen {article.content} skal være mindst 600 ord lange. Din skrivning skal inkludere en fangende clickbait titel udfra {article.title} samt teaser udfra {article.teaser}.
Returnér dit output i JSON-format med følgende felter: "title", "teaser", og "content" (hvor "content" skal være i HTML-format KUN med <p>, <h3>, og <a> tags).
"""



completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="gpt-4o",
)

gpt_output = completion.choices[0].message.content
gpt_output_stripped = gpt_output.strip("```json").strip("```")


# Konverter GPT-output til Python dict
gpt_data = json.loads(gpt_output_stripped)

title_output = gpt_data['title']
teaser_output = gpt_data['teaser']

# Parse HTML-indholdet fra GPT-output
html_content = gpt_data['content']
soup = BeautifulSoup(html_content, 'html.parser')

print(soup, 'souuup')

# Opret en liste til Portable Text-blokke
portable_text_blocks = []

# Gennemgå alle elementer i den parsed HTML
for element in soup.children:
    if element.name == 'p':
        # Tilføj Portable Text blok for almindelig brødtekst (p-tags)
        portable_text_blocks.append({
            "_type": "block",
            "_key": str(random.randint(0, 999999999999)),
            "style": "normal",  # Definerer brødtekst
            "children": [
                {
                    "_type": "span",
                    "_key": str(random.randint(0, 999999999999)),
                    "text": element.text,  # Teksten fra <p>
                    "marks": []  # Ingen ekstra styling
                }
            ],
            "markDefs": []
        })
    elif element.name == 'h3':
        # Tilføj Portable Text blok for overskrifter (h3-tags)
        portable_text_blocks.append({
            "_type": "block",
            "_key": str(random.randint(0, 999999999999)),
            "style": "h3",  # Definerer h3-stil for overskrifter
            "children": [
                {
                    "_type": "span",
                    "_key": str(random.randint(0, 999999999999)),
                    "text": element.text,  # Teksten fra <h3>
                    "marks": []  # Ingen ekstra styling
                }
            ],
            "markDefs": []
        })
    elif element.name == 'a':
        # Tilføj Portable Text blok for links (a-tags)
        portable_text_blocks.append({
            "_type": "block",
            "_key": str(random.randint(0, 999999999999)),
            "style": "normal",
            "children": [
                {
                    "_type": "span",
                    "_key": str(random.randint(0, 999999999999)),
                    "text": element.text,  # Teksten fra <a>
                    "marks": ["link"]  # Markér som link
                }
            ],
            "markDefs": [
                {
                    "_type": "link",
                    "_key": "link_" + str(random.randint(0, 999999999999)),
                    "href": element['href']  # URL fra <a>
                }
            ]
        })

# Udskriv Portable Text-blokkene for at kontrollere indholdet
print("Portable Text Blocks:", json.dumps(portable_text_blocks, indent=2))

# Herefter skal portable_text_blocks bruges til at oprette Sanity-artiklen
sanity_article_data = {
    "mutations": [
        {
            "create": {
                "_type": "article",
                "title": title_output,
                "teaser": teaser_output,
                "overview": portable_text_blocks,  # Indsæt dine Portable Text-blokke her
                "metaImage": {
                    "_type": "image",
                    "asset": {
                        "_type": "reference",
                        "_ref": image_id  # Brug billedets asset-ID her
                    }
                },
                "views": 0,
                "isPublished": 0,
                "changePublishDate": False,
                "publishMonth": 0,
                "facebookFields": False,
                "previewMode": False,
                "updateJournalist": False,
                "disclaimer": True
            }
        }
    ]
}

# Send POST anmodning til Sanity
response = requests.post(SANITY_URL, headers=SANITY_HEADERS, data=json.dumps(sanity_article_data))

# Check responsen fra Sanity API
if response.status_code == 200:
    print("Artiklen blev oprettet succesfuldt i Sanity Studio.")
    print(response.json())
else:
    print(f"Der opstod en fejl: {response.status_code}")
    print(response.json())
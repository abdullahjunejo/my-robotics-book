---
sidebar_position: 2
id: gen-ai-robotics
slug: /gen-ai-robotics
title: "🧠 2. روبوٹکس میں جنریٹو اے آئی: تکنیکی گہرائی"
---

import AIActions from '@site/src/components/AIActions';

<AIActions chapterTitle="Generative AI in Robotics" />

# نیورل ڈائنامکس کا تعارف (Introduction)

# جنریٹو اے آئی اور روبوٹکس فاؤنڈیشن ماڈلز

جنریٹو اے آئی (Generative AI) اب صرف چیٹ بوٹس تک محدود نہیں ہے؛ یہ اب فزیکل اے آئی سسٹمز کے لیے بنیادی "علمی انجن" (Cognitive Engine) بن چکا ہے。 یہ باب اس بات کی وضاحت کرتا ہے کہ کس طرح بڑے لسانی ماڈلز (LLMs) اور ویژن ماڈلز کو روبوٹک حرکات میں تبدیل کیا جاتا ہے。

---

## 2.1 متن سے حرکت تک (Vision-Language-Action)
روایتی روبوٹس کو ایک چھوٹے سے کام کے لیے بھی سی پلس پلس (C++) کے ہزاروں لائنوں کے کوڈ کی ضرورت ہوتی تھی。 جدید فزیکل اے آئی **VLA (Vision-Language-Action)** ماڈلز کا استعمال کرتی ہے:
* **بصارت (Vision):** روبوٹ گندگی سے بھری میز کی تصویر دیکھتا ہے。
* **زبان (Language):** صارف کہتا ہے، "سبز رنگ کی چیز اٹھاؤ"。
* **عمل (Action):** اے آئی بازو کو حرکت دینے کے لیے جوڑوں (Joints) کی درست طاقت کا اندازہ لگاتی ہے。



## 2.2 بیہیویئر کلوننگ اور امیٹیشن لرننگ
آج کی سب سے طاقتور تکنیکوں میں سے ایک **بیہیویئر کلوننگ** (Behavior Cloning) ہے。 روبوٹ کو پروگرام کرنے کے بجائے، ہم اسے انسانوں کے کام کرنے کی ویڈیوز دکھاتے ہیں:
1. **ڈیٹا کا مجموعہ:** ہزاروں ویڈیوز ٹرانسفارمر ماڈل کو دی جاتی ہیں。
2. **ٹوکنائزیشن (Tokenization):** روبوٹک حرکات کو "ٹوکن" میں تبدیل کیا جاتا ہے، بالکل اسی طرح جیسے جملے میں الفاظ ہوتے ہیں。
3. **انفرنس (Inference):** روبوٹ بصری ترتیب (Visual Sequence) کی بنیاد پر اگلی حرکت کی "پیش گوئی" کرتا ہے。

## 2.3 روبوٹک ٹاسک پلانرز کے طور پر LLMs
بڑے لسانی ماڈلز (LLMs) پیچیدہ اہداف کو چھوٹے کاموں میں تقسیم کرنے میں بہترین ہیں:
* **ہدف:** "میرے لیے چائے کا ایک کپ بناؤ"。
* **LLM کی تقسیم:** 1. کیتلی تلاش کریں。
  2. سنک کی طرف بڑھیں。
  3. پانی بھریں。
  4. چولہا آن کریں。

---

## 2.4 کوڈ کی مثال: LLM سے چلنے والے ٹاسک کا نفاذ
پیشہ ورانہ سسٹمز LLMs کو روبوٹک کنٹرولرز سے جوڑنے کے لیے پائتھون APIs کا استعمال کرتے ہیں:

```python
import json

class GenerativeBrain:
    def __init__(self, model_name="Robotics-GPT"):
        self.model = model_name
        self.knowledge_base = "Physical AI Dynamics"

    def translate_command_to_action(self, natural_language_command):
        # کمانڈ پر کارروائی کرنے کا عمل
        print(f"کمانڈ پر عمل ہو رہا ہے: '{natural_language_command}'")
        
        # مثال کے طور پر آؤٹ پٹ: زبان کو روبوٹک کوآرڈینیٹس میں تبدیل کرنا
        action_plan = {
            "task": "pick_and_place",
            "coordinates": [0.45, -0.12, 0.88],
            "velocity": "آہستہ",
            "gripper_force": "درمیانہ"
        }
        return json.dumps(action_plan, indent=2)

brain = GenerativeBrain()
print("اے آئی کا تیار کردہ ایکشن پلان:")
print(brain.translate_command_to_action("سرخ سرکٹ بورڈ کو احتیاط سے اٹھاؤ"))
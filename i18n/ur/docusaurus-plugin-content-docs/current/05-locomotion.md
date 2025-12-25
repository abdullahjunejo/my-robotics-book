---
sidebar_position: 5
id: locomotion-control
slug: /locomotion-control
title: "🦾 5. ہیومنائیڈ لوکوموشن (حرکت)"
---

import AIActions from '@site/src/components/AIActions';

<AIActions chapterTitle="Humanoid Locomotion" />

# نیورل ڈائنامکس کا تعارف (Introduction)

# دو ٹانگوں پر چلنا اور استحکام (Stability)

انسان نما (Humanoid) روبوٹس جیسے **Digit** کا چلنا ایک بہت بڑی تکنیکی کامیابی ہے。

* **توازن کا کنٹرول (Balance Control):** دو ٹانگوں پر کھڑا ہونا اور گرنے سے بچنا。
* **راستوں کی نیویگیشن (Terrain Navigation):** سیڑھیوں اور کھردری جگہوں پر چلنا。
* **حرکت کی منطق (Movement Logic):** روبوٹ کے جوڑوں (Joints) کو صحیح زاویے پر حرکت دینا。

![Digit](https://www.agilityrobotics.com/assets/images/digit-standing.jpg)

# چلنے کا فن: ہیومنائیڈ ڈائنامکس

ہیومنائیڈ روبوٹس جیسے **Digit** کو انسانوں کے لیے بنائے گئے ماحول میں کام کرنے کے لیے ڈیزائن کیا گیا ہے。 تاہم، دو ٹانگوں پر توازن برقرار رکھنا ایک بہت بڑا ریاضیاتی چیلنج ہے。

## 5.1 توازن کی طبیعیات (Zero Moment Point - ZMP)
گرنے سے بچنے کے لیے، روبوٹ کو اپنا **زیرو مومنٹ پوائنٹ (ZMP)** اپنے "سپورٹ پولی گون" (پیروں کے درمیان کا علاقہ) کے اندر برقرار رکھنا چاہیے。 اگر ZMP اس علاقے سے باہر نکل جائے تو روبوٹ گر جائے گا。

## 5.2 ہول باڈی کنٹرول (Whole-Body Control - WBC)
پیشہ ورانہ ہیومنائیڈ روبوٹس صرف اپنی ٹانگیں نہیں ہلاتے。 وہ متحرک حرکات کے دوران توازن برقرار رکھنے کے لیے اپنے بازوؤں اور دھڑ (Torso) کو مخالف وزن (Counter-weights) کے طور پر استعمال کرتے ہیں。
* **سوئنگ فیز (Swing Phase):** جب ایک ٹانگ ہوا میں ہوتی ہے。
* **اسٹینس فیز (Stance Phase):** جب پاؤں زمین کے ساتھ رابطے میں ہوتا ہے。

## 5.3 تکنیکی خصوصیات: ڈیجٹ (Digit) روبوٹ
ڈیجٹ فزیکل اے آئی کی ایک عالمی معیار کی مثال ہے:
* **قد:** 1.55 میٹر。
* **وزن:** 65 کلوگرام。
* **ڈگری آف فریڈم (DoF):** 20 سے زیادہ جوڑ。
* **سینسرز:** 4 ڈیتھ کیمرے + LiDAR。

### 📐 انورس کائینی میٹکس (Inverse Kinematics - IK) کیلکولیشن لاجک
```python
import math

def calculate_leg_ik(x, y, l1=0.4, l2=0.4):
    # ٹانگ کے حصوں کے لیے جوڑوں کے زاویوں کا حساب لگانا
    distance = math.sqrt(x**2 + y**2)
    theta_knee = math.acos((l1**2 + l2**2 - distance**2) / (2 * l1 * l2))
    return f"ہدف گھٹنے کا زاویہ (Knee Angle): {math.degrees(theta_knee):.2f}°"

print(calculate_leg_ik(0.3, -0.5))
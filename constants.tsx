
import { Curriculum, Grade } from './types';

export const CURRICULUM: Curriculum = {
  [Grade.Primary4]: [
    {
      id: 'p4-u1',
      title: { ar: 'الوحدة الأولى: القيمة المكانية', en: 'Unit 1: Place Value' },
      lessons: [
        { id: 'p4-u1-l1', title: { ar: 'الأعداد الكبيرة', en: 'Large Numbers' }, warmup: '', concept: '', toolType: 'placeValue' },
        { id: 'p4-u1-l2', title: { ar: 'تغيير القيم المكانية', en: 'Changing Place Value' }, warmup: '', concept: '', toolType: 'placeValue' },
        { id: 'p4-u1-l3', title: { ar: 'صيغ متنوعة لكتابة الأعداد', en: 'Different Forms of Numbers' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u1-l4', title: { ar: 'تكوين الأعداد وتحليلها', en: 'Composing & Decomposing Numbers' }, warmup: '', concept: '', toolType: 'placeValue' },
        { id: 'p4-u1-l5', title: { ar: 'مقارنة الأعداد الكبيرة', en: 'Comparing Large Numbers' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u1-l6', title: { ar: 'مقارنة الأعداد في صيغ مختلفة', en: 'Comparing Numbers in Different Forms' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u1-l7', title: { ar: 'ترتيب الأعداد تنازلياً وتصاعدياً', en: 'Ordering Numbers' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u1-l8', title: { ar: 'قواعد التقريب', en: 'Rounding Rules' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p4-u2',
      title: { ar: 'الوحدة الثانية: إستراتيجيات عمليتي الجمع والطرح', en: 'Unit 2: Addition & Subtraction Strategies' },
      lessons: [
        { id: 'p4-u2-l1', title: { ar: 'خواص عملية الجمع', en: 'Properties of Addition' }, warmup: '', concept: '', toolType: 'counters' },
        { id: 'p4-u2-l2', title: { ar: 'الجمع مع إعادة التسمية', en: 'Addition with Regrouping' }, warmup: '', concept: '', toolType: 'placeValue' },
        { id: 'p4-u2-l3', title: { ar: 'الطرح مع إعادة التسمية', en: 'Subtraction with Regrouping' }, warmup: '', concept: '', toolType: 'placeValue' },
        { id: 'p4-u2-l4', title: { ar: 'النماذج الشريطية والمتغيرات والمسائل الكلامية', en: 'Bar Models, Variables & Word Problems' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u2-l5', title: { ar: 'حل مسائل كلامية متعددة الخطوات باستخدام الجمع والطرح', en: 'Multi-step Word Problems' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p4-u3',
      title: { ar: 'الوحدة الثالثة: مفاهيم القياس', en: 'Unit 3: Measurement Concepts' },
      lessons: [
        { id: 'p4-u3-l1', title: { ar: 'قياس الطول', en: 'Measuring Length' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u3-l2', title: { ar: 'قياس الكتلة', en: 'Measuring Mass' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u3-l3', title: { ar: 'وحدات قياس السعة', en: 'Units of Capacity' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u3-l4', title: { ar: 'وحدات قياس الوقت', en: 'Units of Time' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u3-l5', title: { ar: 'الوقت المنقضي', en: 'Elapsed Time' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u3-l6', title: { ar: 'تطبيقات القياس 1', en: 'Measurement Apps 1' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u3-l7', title: { ar: 'تطبيقات القياس 2', en: 'Measurement Apps 2' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p4-u4',
      title: { ar: 'الوحدة الرابعة: المساحة والمحيط', en: 'Unit 4: Area & Perimeter' },
      lessons: [
        { id: 'p4-u4-l1', title: { ar: 'إيجاد المحيط', en: 'Finding Perimeter' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u4-l2', title: { ar: 'إيجاد المساحة', en: 'Finding Area' }, warmup: '', concept: '', toolType: 'array' },
        { id: 'p4-u4-l3', title: { ar: 'أبعاد مجهولة', en: 'Unknown Dimensions' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u4-l4', title: { ar: 'الأشكال الهندسية المركبة', en: 'Composite Geometric Shapes' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p4-u5',
      title: { ar: 'الوحدة الخامسة: عملية الضرب كعلاقة', en: 'Unit 5: Multiplication as a Relationship' },
      lessons: [
        { id: 'p4-u5-l1', title: { ar: 'مقارنة الأعداد باستخدام عملية الضرب', en: 'Comparing Numbers using Multiplication' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u5-l2', title: { ar: 'تكوين معادلات للمقارنة باستخدام عملية الضرب', en: 'Creating Comparison Equations' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u5-l3', title: { ar: 'حل معادلات للمقارنة باستخدام عملية الضرب', en: 'Solving Comparison Equations' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u5-l4', title: { ar: 'خاصية الإبدال في عملية الضرب', en: 'Commutative Property of Multiplication' }, warmup: '', concept: '', toolType: 'counters' },
        { id: 'p4-u5-l5', title: { ar: 'خاصية العنصر المحايد والضرب في صفر', en: 'Identity & Zero Property' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u5-l6', title: { ar: 'خاصية الدمج في عملية الضرب', en: 'Associative Property of Multiplication' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u5-l7', title: { ar: 'تطبيق الأنماط في عملية الضرب', en: 'Applying Patterns in Multiplication' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p4-u6',
      title: { ar: 'الوحدة السادسة: العوامل والمضاعفات', en: 'Unit 6: Factors & Multiples' },
      lessons: [
        { id: 'p4-u6-l1', title: { ar: 'تحديد عوامل الأعداد الصحيحة', en: 'Identifying Factors' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u6-l2', title: { ar: 'الأعداد الأولية والأعداد متعددة العوامل', en: 'Prime & Composite Numbers' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u6-l3', title: { ar: 'العامل المشترك الأكبر (ع.م.أ)', en: 'Greatest Common Factor (GCF)' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u6-l4', title: { ar: 'تحديد مضاعفات الأعداد الصحيحة', en: 'Identifying Multiples' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u6-l5', title: { ar: 'المضاعفات المشتركة', en: 'Common Multiples' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u6-l6', title: { ar: 'العلاقات بين العوامل والمضاعفات', en: 'Factors & Multiples Relationships' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p4-u7',
      title: { ar: 'الوحدة السابعة: عمليتا الضرب والقسمة: الحساب والعلاقات', en: 'Unit 7: Multiplication & Division' },
      lessons: [
        { id: 'p4-u7-l1', title: { ar: 'إستراتيجية نموذج مساحة المستطيل', en: 'Area Model Strategy' }, warmup: '', concept: '', toolType: 'array' },
        { id: 'p4-u7-l2', title: { ar: 'خاصية التوزيع', en: 'Distributive Property' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u7-l3', title: { ar: 'خوارزمية عملية الضرب بالتجزئة', en: 'Partial Products Algorithm' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u7-l4', title: { ar: 'الضرب في عدد مكون من رقم واحد', en: 'Multiplying by 1-digit' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u7-l5', title: { ar: 'ضرب عدد مكون من رقمين في مضاعفات العدد 10', en: 'Multiplying by 2-digits in Multiples of 10' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u7-l6', title: { ar: 'استكشاف باقي القسمة', en: 'Exploring Remainders' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u7-l7', title: { ar: 'الأنماط في عملية القسمة', en: 'Patterns in Division' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u7-l8', title: { ar: 'القسمة باستخدام نموذج مساحة المستطيل', en: 'Division using Area Model' }, warmup: '', concept: '', toolType: 'array' },
        { id: 'p4-u7-l9', title: { ar: 'خوارزمية خارج القسمة بالتجزئة', en: 'Partial Quotients Algorithm' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u7-l10', title: { ar: 'خوارزمية القسمة المعيارية', en: 'Standard Division Algorithm' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u7-l11', title: { ar: 'القسمة والضرب', en: 'Multiplication & Division Relationship' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p4-u8',
      title: { ar: 'الوحدة الثامنة: ترتيب العمليات', en: 'Unit 8: Order of Operations' },
      lessons: [
        { id: 'p4-u8-l1', title: { ar: 'ترتيب إجراء العمليات الحسابية', en: 'Order of Operations' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p4-u8-l2', title: { ar: 'ترتيب العمليات والمسائل الكلامية', en: 'Operations & Word Problems' }, warmup: '', concept: '', toolType: 'none' },
      ]
    }
  ],
  [Grade.Primary5]: [
    {
      id: 'p5-u1',
      title: { ar: 'الوحدة الأولى: القيمة المكانية للأعداد العشرية وحسابها', en: 'Unit 1: Place Value & Decimals' },
      lessons: [
        { id: 'p5-u1-l1', title: { ar: 'الكسور العشرية حتى جزء من الألف', en: 'Decimals to Thousandths' }, warmup: '', concept: '', toolType: 'placeValue' },
        { id: 'p5-u1-l2', title: { ar: 'تغيير القيم المكانية', en: 'Changing Place Value' }, warmup: '', concept: '', toolType: 'placeValue' },
        { id: 'p5-u1-l3', title: { ar: 'تكوين الكسور العشرية وتحليلها', en: 'Composing & Decomposing Decimals' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u1-l4', title: { ar: 'مقارنة الكسور العشرية', en: 'Comparing Decimals' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u1-l5', title: { ar: 'تقريب الكسور العشرية', en: 'Rounding Decimals' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u1-l6', title: { ar: 'تقدير مجموع الأعداد العشرية', en: 'Estimating Decimal Sums' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u1-l7', title: { ar: 'نمذجة جمع الكسور العشرية', en: 'Modeling Decimal Addition' }, warmup: '', concept: '', toolType: 'array' },
        { id: 'p5-u1-l8', title: { ar: 'نمذجة طرح الكسور العشرية', en: 'Modeling Decimal Subtraction' }, warmup: '', concept: '', toolType: 'array' },
        { id: 'p5-u1-l9', title: { ar: 'تقدير الفرق بين عددين عشريين', en: 'Estimating Differences' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u1-l10', title: { ar: 'طرح الكسور العشرية حتى جزء من الألف', en: 'Subtracting Decimals to Thousandths' }, warmup: '', concept: '', toolType: 'placeValue' },
        { id: 'p5-u1-l11', title: { ar: 'مسائل كلامية على الكسور العشرية', en: 'Decimal Word Problems' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p5-u2',
      title: { ar: 'الوحدة الثانية: العلاقات بين الأعداد', en: 'Unit 2: Relationships between Numbers' },
      lessons: [
        { id: 'p5-u2-l1', title: { ar: 'التعبيرات الرياضية والمعادلات والمتغيرات', en: 'Expressions & Equations' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u2-l2', title: { ar: 'المتغيرات في المعادلات', en: 'Variables in Equations' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u2-l3', title: { ar: 'القصص والأعداد', en: 'Stories & Numbers' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u2-l4', title: { ar: 'تحليل العدد إلى عوامل أولية', en: 'Prime Factorization' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u2-l5', title: { ar: 'العامل المشترك الأكبر (ع.م.أ)', en: 'Greatest Common Factor' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u2-l6', title: { ar: 'تحديد المضاعفات', en: 'Identifying Multiples' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u2-l7', title: { ar: 'المضاعف المشترك الأصغر (م.م.أ)', en: 'Least Common Multiple' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u2-l8', title: { ar: 'عوامل أم مضاعفات؟', en: 'Factors or Multiples?' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p5-u3',
      title: { ar: 'الوحدة الثالثة: ضرب الأعداد الصحيحة', en: 'Unit 3: Multiplying Whole Numbers' },
      lessons: [
        { id: 'p5-u3-l1', title: { ar: 'استخدام نموذج مساحة المستطيل في عملية الضرب', en: 'Multiplication using Area Model' }, warmup: '', concept: '', toolType: 'array' },
        { id: 'p5-u3-l2', title: { ar: 'خاصية التوزيع في عملية الضرب', en: 'Distributive Property' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u3-l3', title: { ar: 'الضرب في عدد مكون من رقمين باستخدام الخوارزمية المعيارية', en: 'Standard Algorithm Multiplication' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u3-l4', title: { ar: 'ضرب الأعداد متعددة الأرقام', en: 'Multiplying Multi-digit Numbers' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u3-l5', title: { ar: 'مسائل كلامية على الضرب', en: 'Multiplication Word Problems' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p5-u4',
      title: { ar: 'الوحدة الرابعة: القسمة على أعداد صحيحة', en: 'Unit 4: Division of Whole Numbers' },
      lessons: [
        { id: 'p5-u4-l1', title: { ar: 'القسمة باستخدام نموذج مساحة المستطيل', en: 'Division using Area Model' }, warmup: '', concept: '', toolType: 'array' },
        { id: 'p5-u4-l2', title: { ar: 'تقدير خارج القسمة', en: 'Estimating Quotients' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u4-l3', title: { ar: 'استخدام خوارزمية القسمة', en: 'Using Division Algorithm' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u4-l4', title: { ar: 'علاقة القسمة بالضرب', en: 'Division & Multiplication Relationship' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u4-l5', title: { ar: 'مسائل كلامية متعددة الخطوات', en: 'Multi-step Word Problems' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p5-u5',
      title: { ar: 'الوحدة الخامسة: عمليتا الضرب والقسمة مع الكسور العشرية', en: 'Unit 5: Multiplication & Division with Decimals' },
      lessons: [
        { id: 'p5-u5-l1', title: { ar: 'الضرب في قوى العدد 10', en: 'Multiplying by Powers of 10' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u5-l2', title: { ar: 'ضرب الكسور العشرية في أعداد صحيحة', en: 'Multiplying Decimals by Whole Numbers' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u5-l3', title: { ar: 'ضرب الأجزاء من عشرة في أجزاء من عشرة', en: 'Multiplying Tenths by Tenths' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u5-l4', title: { ar: 'ضرب الكسور العشرية باستخدام نموذج مساحة المستطيل', en: 'Decimal Multiplication Area Model' }, warmup: '', concept: '', toolType: 'array' },
        { id: 'p5-u5-l5', title: { ar: 'ضرب الكسور العشرية حتى جزء من مئة', en: 'Multiplying to Hundredths' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u5-l6', title: { ar: 'ضرب الكسور العشرية حتى جزء من الألف', en: 'Multiplying to Thousandths' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u5-l7', title: { ar: 'الكسور العشرية والنظام المتري', en: 'Decimals & Metric System' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u5-l8', title: { ar: 'القياس والكسور العشرية وقوى العدد 10', en: 'Measurement & Powers of 10' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u5-l9', title: { ar: 'حل مسائل كلامية متعددة الخطوات', en: 'Solving Multi-step Word Problems' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u5-l10', title: { ar: 'القسمة على قوى العدد 10', en: 'Division by Powers of 10' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u5-l11', title: { ar: 'الأنماط والعلاقات في قوى العدد 10', en: 'Patterns and Relationships in Powers of 10' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u5-l12', title: { ar: 'قسمة كسور عشرية على أعداد صحيحة', en: 'Dividing Decimals by Whole Numbers' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u5-l13', title: { ar: 'قسمة كسور عشرية على كسور عشرية', en: 'Dividing Decimals by Decimals' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p5-u6',
      title: { ar: 'الوحدة السادسة: التعبيرات العددية والأنماط', en: 'Unit 6: Numerical Expressions and Patterns' },
      lessons: [
        { id: 'p5-u6-l1', title: { ar: 'ترتيب إجراء العمليات الحسابية', en: 'Order of Operations' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u6-l2', title: { ar: 'تعبيرات عددية تتضمن أقواساً', en: 'Numerical Expressions with Parentheses' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u6-l3', title: { ar: 'كتابة تعبير عددي لتمثيل موقف ما', en: 'Writing Numerical Expressions' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p5-u6-l4', title: { ar: 'تحديد الأنماط العددية', en: 'Identifying Numerical Patterns' }, warmup: '', concept: '', toolType: 'none' },
      ]
    }
  ],
  [Grade.Primary6]: [
    {
      id: 'p6-u1',
      title: { ar: 'الوحدة الأولى: قابلية القسمة والعوامل والمضاعفات', en: 'Unit 1: Divisibility, Factors & Multiples' },
      lessons: [
        { id: 'p6-u1-l1', title: { ar: 'قابلية القسمة', en: 'Divisibility' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u1-l2', title: { ar: 'تحليل العدد إلى عوامله الأولية', en: 'Prime Factorization' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u1-l3', title: { ar: 'كتابة تعبيرات عددية باستخدام ع.م.أ', en: 'Numerical Expressions using GCF' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u1-l4', title: { ar: 'تحليل المضاعف المشترك الأصغر', en: 'Analyzing Least Common Multiple' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p6-u2',
      title: { ar: 'الوحدة الثانية: الأعداد النسبية', en: 'Unit 2: Rational Numbers' },
      lessons: [
        { id: 'p6-u2-l1', title: { ar: 'استخدام خط الأعداد لوصف البيانات', en: 'Using Number Lines for Data' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u2-l2', title: { ar: 'استخدام خط الأعداد والرموز لمقارنة الأعداد', en: 'Comparing Numbers using Number Lines' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u2-l3', title: { ar: 'تحليل الأعداد النسبية باستخدام النماذج', en: 'Analyzing Rational Numbers with Models' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u2-l4', title: { ar: 'مقارنة الأعداد النسبية وترتيبها', en: 'Comparing & Ordering Rational Numbers' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u2-l5', title: { ar: 'استكشاف القيمة المطلقة', en: 'Exploring Absolute Value' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u2-l6', title: { ar: 'مقارنة القيم المطلقة', en: 'Comparing Absolute Values' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p6-u3',
      title: { ar: 'الوحدة الثالثة: المقادير الجبرية', en: 'Unit 3: Algebraic Expressions' },
      lessons: [
        { id: 'p6-u3-l1', title: { ar: 'تكوين تعبيرات رياضية', en: 'Creating Mathematical Expressions' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u3-l2', title: { ar: 'تحليل التعبيرات الرياضية', en: 'Analyzing Mathematical Expressions' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u3-l3', title: { ar: 'كتابة مقادير جبرية', en: 'Writing Algebraic Expressions' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u3-l4', title: { ar: 'ترتيب العمليات والأسس', en: 'Order of Operations & Exponents' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u3-l5', title: { ar: 'إيجاد قيمة المقدار الجبري', en: 'Evaluating Algebraic Expressions' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u3-l6', title: { ar: 'تطبيقات على المقادير الجبرية', en: 'Applications of Algebraic Expressions' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u3-l7', title: { ar: 'تحديد المقادير الجبرية المتكافئة', en: 'Identifying Equivalent Expressions' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p6-u4',
      title: { ar: 'الوحدة الرابعة: المعادلات والمتباينات', en: 'Unit 4: Equations & Inequalities' },
      lessons: [
        { id: 'p6-u4-l1', title: { ar: 'حل المعادلات الجبرية', en: 'Solving Algebraic Equations' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u4-l2', title: { ar: 'استكشاف المتباينات', en: 'Exploring Inequalities' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u4-l3', title: { ar: 'حل المتباينات', en: 'Solving Inequalities' }, warmup: '', concept: '', toolType: 'none' },
      ]
    },
    {
      id: 'p6-u5',
      title: { ar: 'الوحدة الخامسة: المتغيرات التابعة والمستقلة', en: 'Unit 5: Dependent & Independent Variables' },
      lessons: [
        { id: 'p6-u5-l1', title: { ar: 'العلاقة بين المتغير التابع والمتغير المستقل', en: 'Relationship between Variables' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u5-l2', title: { ar: 'تطبيقات على المتغيرات التابعة والمستقلة', en: 'Applications of Variables' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u5-l3', title: { ar: 'تحليل العلاقة بين المتغير التابع والمستقل', en: 'Analyzing the Relationship' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u5-l4', title: { ar: 'التمثيل البياني للمتغيرات التابعة والمستقلة', en: 'Graphing Variables' }, warmup: '', concept: '', toolType: 'graph' },
      ]
    },
    {
      id: 'p6-u6',
      title: { ar: 'الوحدة السادسة: توزيع البيانات', en: 'Unit 6: Data Distribution' },
      lessons: [
        { id: 'p6-u6-l1', title: { ar: 'جمع البيانات والأسئلة الإحصائية', en: 'Data Collection & Statistical Questions' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u6-l2', title: { ar: 'استكشاف المدرج التكراري', en: 'Exploring Histograms' }, warmup: '', concept: '', toolType: 'graph' },
        { id: 'p6-u6-l3', title: { ar: 'تمثيل البيانات بالمدرج التكراري', en: 'Representing Data with Histograms' }, warmup: '', concept: '', toolType: 'graph' },
        { id: 'p6-u6-l4', title: { ar: 'استكشاف المخطط الصندوقي', en: 'Exploring Box Plots' }, warmup: '', concept: '', toolType: 'graph' },
        { id: 'p6-u6-l5', title: { ar: 'تطبيقات على التمثيلات البيانية', en: 'Applications of Data Representation' }, warmup: '', concept: '', toolType: 'graph' },
      ]
    },
    {
      id: 'p6-u7',
      title: { ar: 'الوحدة السابعة: مقاييس النزعة المركزية والانتشار', en: 'Unit 7: Measures of Central Tendency & Spread' },
      lessons: [
        { id: 'p6-u7-l1', title: { ar: 'استكشاف توازن مجموعات البيانات', en: 'Exploring Data Balance' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u7-l2', title: { ar: 'تفسير الوسط الحسابي', en: 'Interpreting the Mean' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u7-l3', title: { ar: 'استكشاف الوسيط والمنوال والقيم المتطرفة', en: 'Median, Mode & Outliers' }, warmup: '', concept: '', toolType: 'none' },
        { id: 'p6-u7-l4', title: { ar: 'استكشاف المدى', en: 'Exploring the Range' }, warmup: '', concept: '', toolType: 'none' },
      ]
    }
  ]
};

export const MISS_SARA_PROMPT = `
أنتِ "ميس سارة"، معلمة ماث (Mathematics) مصرية، ودودة وصبورة جداً.
تدرسين المنهج المصري (Primary 4-6) وفق نظام التعليم الجديد (Education 2.0).

قواعد التعامل الصارمة:
1. التزمي التزامًا حرفيًا بالمنهج المصري وترتيب الوحدات والدروس المذكورة في PDF.
2. اشرحي الدرس على مراحل (فقرات قصيرة).
3. بعد كل فقرة شرح، توقفي واسألي الطالب سؤالاً بسيطاً للتأكد من فهمه.
4. استخدمي العلامات الرياضية القياسية المعروفة للتلاميذ في النص والردود:
   - (+) للجمع.
   - (-) للطرح.
   - (*) للضرب.
   - (/) للقسمة.
5. يجب أن يكون النص الذي تكتبينه مطابقاً تماماً لما تقولينه صوتياً (Text-to-Speech sync).
6. استعملي شخصيتك المشجعة "يا بطل الماث"، "أنت ذكي جداً".
7. إذا أخطأ الطالب، قولي "محاولة جيدة، لكن فكر في كذا..." ووضحي السبب.
8. كوني حريصة على شرح أي نص أو مسألة رياضية تقومين بإنشائها بوضوح تام.
`;

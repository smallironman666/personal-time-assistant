import React, { useState, useEffect } from 'react';

function App() {
  // 状态定义
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentActivity, setCurrentActivity] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [isHydrationReminder, setIsHydrationReminder] = useState(false);
  const [nextActivity, setNextActivity] = useState(null);
  const [randomTip, setRandomTip] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dailyActivities, setDailyActivities] = useState([]);

  // 健康提醒分类
  const healthTips = {
    exercise: [
      "运动前先测量血压，如果收缩压超过180mmHg或舒张压超过110mmHg，建议不要运动",
      "确保能够在运动过程中正常交谈，避免过度喘息",
      "如果运动中出现头晕、胸闷、心悸等不适，应立即停止并休息",
      "运动时注意保持水分，但避免一次大量饮水",
      "避免在极热或极冷环境下运动",
      "循序渐进，不要急于求成"
    ],
    work: [
      "每工作一小时，起身活动3-5分钟，避免久坐",
      "保持正确坐姿，避免长时间低头看屏幕",
      "多喝水，保持充足水分有助于保持注意力",
      "尝试25分钟工作，5分钟休息的番茄工作法",
      "适当远眺窗外，让眼睛得到放松",
      "注意工作环境的光线和温度适宜"
    ],
    relaxation: [
      "睡前1-2小时不要进行剧烈运动",
      "睡前避免接触强光和电子屏幕，有助于褪黑素分泌",
      "保持卧室温度适中，一般18-22℃最有利于睡眠",
      "避免睡前饮用含咖啡因的饮品",
      "睡前喝杯温牛奶或蜂蜜水有助于放松",
      "可以尝试深呼吸或渐进式肌肉放松法帮助入睡"
    ],
    general: [
      "定期监测血压，了解身体状况变化",
      "保持饮食清淡，少油少盐少糖",
      "保持规律的作息时间对血压控制有益",
      "保持积极心态，避免情绪大起大落",
      "与家人朋友保持良好沟通，社交活动有助于情绪健康",
      "定期复查，遵医嘱服药"
    ],
    midday: [
      "户外活动可以帮助眼睛从屏幕疲劳中恢复",
      "做几次深呼吸可以帮助缓解工作压力",
      "短暂的午休可以提高下午的工作效率",
      "适度伸展可以缓解久坐带来的肌肉紧张",
      "保持良好的水分摄入有助于维持注意力",
      "午餐后的轻度活动有助于消化"
    ],
    homeRelaxation: [
      "从工作到家庭环境的过渡时间有助于减轻压力",
      "换上舒适的衣物可以帮助身心切换到放松状态",
      "回家后先喝杯温水，有助于补充水分",
      "短暂的独处时间可以帮助情绪恢复",
      "可以做些简单的拉伸活动放松身体",
      "听一些舒缓的音乐有助于放松心情"
    ],
    morning: [
      "早晨补充足够的水分可以激活身体各项功能",
      "轻度伸展活动有助于唤醒肌肉，促进血液循环",
      "早晨的阳光有助于调节生物钟，改善睡眠质量",
      "专注用餐有助于消化吸收，为大脑提供能量",
      "出门前的短暂计划可以提高一天的工作效率",
      "保持规律的早晨习惯有助于身心健康"
    ]
  };

  // 活动数据 - 更新了早晨的时间段，按照用户提供的详细计划进行细分
  const activities = [
    // 早晨细分活动
    {
      id: "wake_up",
      name: "起床与喝水",
      startTime: "08:00",
      endTime: "08:05",
      description: "起床后喝一杯温水，补充夜间身体代谢流失的水分。",
      tips: [
        "起床后不要立刻猛地坐起",
        "在床上稍微伸展一下，然后缓慢起床",
        "去厨房倒一杯温水（200-300ml）",
        "小口慢慢喝下"
      ],
      category: "morning"
    },
    {
      id: "morning_activity",
      name: "轻度活动/放松练习",
      startTime: "08:05",
      endTime: "08:20",
      description: "做5-10分钟的简单拉伸，唤醒身体。",
      tips: [
        "颈部：缓慢低头、仰头、左右侧屈、左右转头",
        "肩部：耸肩放松、手臂绕环",
        "背部：猫牛式、坐姿躯干侧屈",
        "腿部：简单的下肢拉伸"
      ],
      category: "morning"
    },
    {
      id: "personal_hygiene",
      name: "个人卫生",
      startTime: "08:20",
      endTime: "08:35",
      description: "洗漱、刷牙、使用洗面奶清洁面部等。",
      tips: [
        "彻底刷牙2-3分钟",
        "使用洗面奶清洁面部",
        "简单洗漱",
        "保持面部清爽"
      ],
      category: "morning"
    },
    {
      id: "breakfast",
      name: "准备并享用营养早餐",
      startTime: "08:35",
      endTime: "08:55",
      description: "准备一份均衡的早餐，并专注地享用。",
      tips: [
        "包含蛋白质：鸡蛋/豆制品",
        "添加碳水：全麦面包/燕麦片",
        "补充液体：牛奶/豆浆",
        "加入水果或坚果提供维生素和矿物质"
      ],
      category: "morning"
    },
    {
      id: "get_dressed",
      name: "换衣整理与环境整理",
      startTime: "08:55",
      endTime: "09:10",
      description: "换上适合工作的衣服，整理好发型和环境。",
      tips: [
        "换上适合工作的衣服",
        "整理好发型",
        "快速整理床铺",
        "保持工作环境整洁"
      ],
      category: "morning"
    },
    {
      id: "mental_prep",
      name: "快速回顾与准备",
      startTime: "09:10",
      endTime: "09:15",
      description: "回顾今天的计划和重要任务，做好心理准备。",
      tips: [
        "浏览日历和待办事项",
        "确认今天最重要的1-3个任务",
        "构思第一个任务的切入点",
        "为工作做好心理准备"
      ],
      category: "morning"
    },
    {
      id: "departure_check",
      name: "出门前检查",
      startTime: "09:15",
      endTime: "09:20",
      description: "检查并确保带齐必需品，准备出门。",
      tips: [
        "确认钥匙、钱包、手机",
        "检查工牌和耳机",
        "带上水杯",
        "穿好鞋，做好出门准备"
      ],
      category: "morning"
    },
    {
      id: "departure",
      name: "出门上班",
      startTime: "09:20",
      endTime: "09:30",
      description: "以积极或平和的心态出门，开始通勤。",
      tips: [
        "深呼吸，保持积极心态",
        "确认已经带齐所有物品",
        "锁好门窗",
        "安全通勤"
      ],
      category: "morning"
    },
    
    {
      id: "work_morning",
      name: "工作时间",
      startTime: "09:30",
      endTime: "11:30",
      description: "专注于金融科技软件工程工作。",
      tips: [
        "每工作50分钟休息10分钟",
        "保持良好坐姿，避免久坐不动",
        "多喝水保持身体水分",
        "注意放松眼睛和肩颈"
      ],
      category: "work"
    },
    {
      id: "lunch_wrapup",
      name: "工作收尾与过渡",
      startTime: "11:30",
      endTime: "11:40",
      description: "完成当前任务小单元，为午休做准备。",
      tips: [
        "记录当前进度和下一步",
        "整理工作区",
        "起身活动，做简单的颈部和肩部转动",
        "决定午餐地点和内容"
      ],
      category: "work"
    },
    {
      id: "mindful_eating",
      name: "用餐与正念饮食",
      startTime: "11:40",
      endTime: "12:15",
      description: "离开工位享用午餐，专注于进食体验。",
      tips: [
        "离开工位，不要在电脑前吃饭",
        "放下手机，慢慢咀嚼品味食物",
        "与同事聊聊非工作话题",
        "适量饮食，避免过饱"
      ],
      category: "midday"
    },
    {
      id: "recovery",
      name: "身心恢复与放松",
      startTime: "12:15",
      endTime: "12:45",
      description: "通过身体活动和精神放松，恢复精力。",
      tips: [
        "户外散步15-20分钟",
        "做一些简单的拉伸",
        "闭目养神/冥想",
        "听音乐或阅读"
      ],
      category: "midday"
    },
    {
      id: "work_prep",
      name: "整理与工作准备",
      startTime: "12:45",
      endTime: "13:00",
      description: "逐渐过渡回工作状态，为下午做准备。",
      tips: [
        "返回工作区，补充水分",
        "整理个人物品",
        "快速浏览下午的任务安排",
        "缓慢启动，不要立刻投入高强度工作"
      ],
      category: "work"
    },
    {
      id: "work_afternoon",
      name: "工作时间",
      startTime: "13:00",
      endTime: "18:00",
      description: "专注于金融科技软件工程工作。",
      tips: [
        "每工作50分钟休息10分钟",
        "下午适当起身活动",
        "保持良好坐姿",
        "多喝水保持水分"
      ],
      category: "work"
    },
    {
      id: "home_transition",
      name: "到家缓冲与切换模式",
      startTime: "18:00",
      endTime: "20:00",
      description: "从工作环境转换到家庭环境，初步放松。",
      tips: [
        "换上舒适的家居服",
        "简单收拾随身物品，喝点温水",
        "稍微走动或安静坐一会儿",
        "有意识地转换心态"
      ],
      category: "homeRelaxation"
    },
    {
      id: "evening_exercise",
      name: "晚间骑行锻炼",
      startTime: "20:00",
      endTime: "20:40",
      description: "进行30分钟中等强度骑行，前后加入热身和整理环节。",
      tips: [
        "热身(5分钟)：从慢速骑行开始",
        "保持中等强度：能说话但唱歌会困难",
        "注意心率控制",
        "整理(5分钟)：逐渐降低踏频"
      ],
      category: "exercise"
    },
    {
      id: "evening_rest",
      name: "休息与兴趣时间",
      startTime: "20:00",
      endTime: "20:40",
      description: "休息或投入个人兴趣爱好的时间。",
      tips: [
        "阅读喜欢的历史书籍",
        "听放松的音乐",
        "观看感兴趣的电影或剧集",
        "避免工作相关的内容"
      ],
      category: "relaxation"
    },
    {
      id: "shower",
      name: "淋浴与放松",
      startTime: "20:40",
      endTime: "21:15",
      description: "洗个温水澡，放松身体。",
      tips: [
        "水温不宜过烫，选择温水",
        "专注于水流冲刷身体的感觉",
        "尽量放空大脑",
        "洗完后用柔软的毛巾擦干身体"
      ],
      category: "relaxation"
    },
    {
      id: "post_shower",
      name: "浴后整理与环境准备",
      startTime: "21:15",
      endTime: "21:30",
      description: "穿上舒适的衣物，整理环境。",
      tips: [
        "穿上睡衣或宽松舒适的衣服",
        "简单整理浴室",
        "确保卧室环境舒适",
        "准备好睡前可能需要的物品"
      ],
      category: "relaxation"
    },
    {
      id: "hobby",
      name: "兴趣爱好时间",
      startTime: "21:30",
      endTime: "23:00",
      description: "投入个人兴趣爱好的时间段。",
      tips: [
        "阅读历史书籍或其他非技术类读物",
        "专注地听音乐",
        "观看影片（注意在22:45左右结束）",
        "逐渐降低活动的兴奋度"
      ],
      category: "relaxation"
    },
    {
      id: "signal_switch",
      name: "信号切换与环境调暗",
      startTime: "23:00",
      endTime: "23:30",
      description: "停止使用电子屏幕，调暗环境灯光。",
      tips: [
        "停止所有电子屏幕使用",
        "将家中灯光调至最暗",
        "播放舒缓的纯音乐或白噪音",
        "做一些安静的准备工作"
      ],
      category: "relaxation"
    },
    {
      id: "deep_relaxation",
      name: "深度放松活动",
      startTime: "23:30",
      endTime: "00:00",
      description: "进行非屏幕的深度放松活动。",
      tips: [
        "阅读纸质书",
        "做几个非常温和的拉伸动作",
        "闭目养神，专注听舒缓音乐",
        "在完全无屏幕、灯光昏暗的环境下进行"
      ],
      category: "relaxation"
    },
    {
      id: "oral_cleaning",
      name: "口腔清洁与最后准备",
      startTime: "00:00",
      endTime: "00:10",
      description: "进行睡前刷牙和使用牙线，去一次洗手间。",
      tips: [
        "彻底清洁牙齿和牙龈",
        "完成所有需要离开床边的生理需求",
        "确保已经准备好明天需要的物品",
        "调整床铺和枕头至舒适状态"
      ],
      category: "relaxation"
    },
    {
      id: "meditation",
      name: "冥想练习",
      startTime: "00:10",
      endTime: "00:25",
      description: "在床上进行冥想练习。",
      tips: [
        "采取舒适的姿势（坐着或躺着）",
        "进行专注呼吸练习",
        "尝试身体扫描冥想",
        "保持心态平静，不要强求入睡"
      ],
      category: "relaxation"
    },
    {
      id: "sleep",
      name: "尝试入睡",
      startTime: "00:25",
      endTime: "08:00",
      description: "关闭所有光源，调整舒适睡姿，尝试入睡。",
      tips: [
        "关闭所有光源或只留非常暗的小夜灯",
        "调整舒适的睡姿",
        "如果难以入睡，专注于呼吸",
        "不要看时间，必要时短暂起床做极度放松的事"
      ],
      category: "relaxation"
    }
  ];

  // 默认活动数据
  const defaultActivity = {
    id: "free_time",
    name: "自由安排时间",
    startTime: "00:00",
    endTime: "00:00",
    description: "当前没有特定计划安排的时间段。",
    tips: [
      "可以根据个人需要自由安排活动",
      "记得保持适当的休息",
      "尽量避免打乱正常作息",
      "如有需要，可以提前准备下一个计划活动"
    ],
    category: "general"
  };

  // 下一个活动映射表
  const nextActivityMap = {
    // 早晨活动链
    "wake_up": "morning_activity",
    "morning_activity": "personal_hygiene",
    "personal_hygiene": "breakfast",
    "breakfast": "get_dressed",
    "get_dressed": "mental_prep",
    "mental_prep": "departure_check",
    "departure_check": "departure",
    "departure": "work_morning",
    
    // 工作和午休
    "work_morning": "lunch_wrapup",
    "lunch_wrapup": "mindful_eating",
    "mindful_eating": "recovery",
    "recovery": "work_prep",
    "work_prep": "work_afternoon",
    "work_afternoon": "home_transition",
    
    // 晚间活动
    "home_transition": "evening_exercise", // 简化，实际应根据日期判断
    "evening_exercise": "shower",
    "evening_rest": "shower",
    "shower": "post_shower",
    "post_shower": "hobby",
    "hobby": "signal_switch",
    "signal_switch": "deep_relaxation",
    "deep_relaxation": "oral_cleaning",
    "oral_cleaning": "meditation",
    "meditation": "sleep",
    "sleep": "wake_up",
    "free_time": "wake_up"
  };

  // 查找当前活动
  const findCurrentActivity = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const day = now.getDay(); // 0是周日，1-6是周一到周六
    const isWeekday = day >= 1 && day <= 5;
    const isExerciseDay = day === 1 || day === 3 || day === 5; // 周一、三、五
    
    // 特殊处理深夜和凌晨的固定时间段
    if (hour === 23 && minute >= 30) {
      return activities.find(a => a.id === "deep_relaxation");
    }
    
    if (hour === 0) {
      if (minute < 10) {
        return activities.find(a => a.id === "oral_cleaning");
      } else if (minute < 25) {
        return activities.find(a => a.id === "meditation");
      } else {
        return activities.find(a => a.id === "sleep");
      }
    }
    
    if (hour >= 1 && hour < 8) {
      return activities.find(a => a.id === "sleep");
    }
    
    // 早晨时间段的细分处理
    if (hour === 8) {
      if (minute < 5) {
        return activities.find(a => a.id === "wake_up");
      } else if (minute < 20) {
        return activities.find(a => a.id === "morning_activity");
      } else if (minute < 35) {
        return activities.find(a => a.id === "personal_hygiene");
      } else if (minute < 55) {
        return activities.find(a => a.id === "breakfast");
      } else {
        return activities.find(a => a.id === "get_dressed");
      }
    }
    
    if (hour === 9) {
      if (minute < 10) {
        return activities.find(a => a.id === "get_dressed");
      } else if (minute < 15) {
        return activities.find(a => a.id === "mental_prep");
      } else if (minute < 20) {
        return activities.find(a => a.id === "departure_check");
      } else if (minute < 30) {
        return activities.find(a => a.id === "departure");
      } else {
        return activities.find(a => a.id === "work_morning");
      }
    }
    
    // 处理正常的工作日时间段
    if (isWeekday) {
      // 上午工作
      if (hour === 10 || (hour === 11 && minute < 30)) {
        return activities.find(a => a.id === "work_morning");
      }
      
      // 午休时间
      if (hour === 11 && minute >= 30 && minute < 40) {
        return activities.find(a => a.id === "lunch_wrapup");
      }
      
      if ((hour === 11 && minute >= 40) || (hour === 12 && minute < 15)) {
        return activities.find(a => a.id === "mindful_eating");
      }
      
      if (hour === 12 && minute >= 15 && minute < 45) {
        return activities.find(a => a.id === "recovery");
      }
      
      if (hour === 12 && minute >= 45) {
        return activities.find(a => a.id === "work_prep");
      }
      
      // 下午工作
      if (hour >= 13 && hour < 18) {
        return activities.find(a => a.id === "work_afternoon");
      }
      
      // 晚间时间
      if (hour === 18 || hour === 19) {
        return activities.find(a => a.id === "home_transition");
      }
      
      // 晚间运动或休息
      if (hour === 20 && minute < 40) {
        return activities.find(a => a.id === (isExerciseDay ? "evening_exercise" : "evening_rest"));
      }
    }
    
    // 共同的晚间流程（工作日和周末）
    if ((hour === 20 && minute >= 40) || (hour === 21 && minute < 15)) {
      return activities.find(a => a.id === "shower");
    }
    
    if (hour === 21 && minute >= 15 && minute < 30) {
      return activities.find(a => a.id === "post_shower");
    }
    
    if ((hour === 21 && minute >= 30) || hour === 22) {
      return activities.find(a => a.id === "hobby");
    }
    
    if (hour === 23 && minute < 30) {
      return activities.find(a => a.id === "signal_switch");
    }
    
    // 如果没有匹配的活动，返回默认的自由时间
    return defaultActivity;
  };

  // 获取当天的活动安排
  const getDailyActivities = () => {
    const day = new Date().getDay();
    const isWeekday = day >= 1 && day <= 5;
    const isExerciseDay = day === 1 || day === 3 || day === 5; // 周一、三、五
    
    // 基础活动（每天都有的）
    let dailyActs = [
      activities.find(a => a.id === "sleep"),
      activities.find(a => a.id === "wake_up"),
      activities.find(a => a.id === "morning_activity"),
      activities.find(a => a.id === "personal_hygiene"),
      activities.find(a => a.id === "breakfast"),
      activities.find(a => a.id === "get_dressed"),
      activities.find(a => a.id === "mental_prep"),
      activities.find(a => a.id === "departure_check"),
      activities.find(a => a.id === "departure")
    ];
    
    // 工作日特有活动
    if (isWeekday) {
      dailyActs = [
        ...dailyActs,
        activities.find(a => a.id === "work_morning"),
        activities.find(a => a.id === "lunch_wrapup"),
        activities.find(a => a.id === "mindful_eating"),
        activities.find(a => a.id === "recovery"),
        activities.find(a => a.id === "work_prep"),
        activities.find(a => a.id === "work_afternoon"),
        activities.find(a => a.id === "home_transition")
      ];
      
      // 周一、三、五 vs 周二、四
      if (isExerciseDay) {
        dailyActs.push(activities.find(a => a.id === "evening_exercise"));
      } else {
        dailyActs.push(activities.find(a => a.id === "evening_rest"));
      }
    }
    
    // 晚间活动（每天都有）
    dailyActs = [
      ...dailyActs,
      activities.find(a => a.id === "shower"),
      activities.find(a => a.id === "post_shower"),
      activities.find(a => a.id === "hobby"),
      activities.find(a => a.id === "signal_switch"),
      activities.find(a => a.id === "deep_relaxation"),
      activities.find(a => a.id === "oral_cleaning"),
      activities.find(a => a.id === "meditation")
    ];
    
    // 过滤掉undefined值
    dailyActs = dailyActs.filter(a => a !== undefined);
    
    // 按照时间排序
    return dailyActs.sort((a, b) => {
      const getMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        let totalMinutes = hours * 60 + minutes;
        
        // 处理跨天的时间（如00:10）
        if (hours < 8) {
          totalMinutes += 24 * 60;
        }
        
        return totalMinutes;
      };
      
      return getMinutes(a.startTime) - getMinutes(b.startTime);
    });
  };

  // 计算活动进度
  const calculateProgress = (activity) => {
    if (!activity || (activity.startTime === "00:00" && activity.endTime === "00:00")) {
      return 0;
    }
    
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentMinutes = hour * 60 + minute;
    
    const [startHour, startMinute] = activity.startTime.split(':').map(Number);
    const [endHour, endMinute] = activity.endTime.split(':').map(Number);
    
    let startMinutes = startHour * 60 + startMinute;
    let endMinutes = endHour * 60 + endMinute;
    
    // 处理跨天的情况
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60; // 加一天
      if (currentMinutes < startMinutes) {
        // 如果当前时间在午夜后，也需要加一天
        currentMinutes += 24 * 60;
      }
    }
    
    const totalMinutes = endMinutes - startMinutes;
    const elapsedMinutes = currentMinutes - startMinutes;
    
    return Math.min(Math.max(0, (elapsedMinutes / totalMinutes) * 100), 100);
  };

  // 计算剩余时间
  const calculateTimeLeft = (activity) => {
    if (!activity || (activity.startTime === "00:00" && activity.endTime === "00:00")) {
      return "未知";
    }
    
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentMinutes = hour * 60 + minute;
    
    const [endHour, endMinute] = activity.endTime.split(':').map(Number);
    let endMinutes = endHour * 60 + endMinute;
    
    // 特殊处理00:00结束时间（午夜）
    if (activity.endTime === "00:00") {
      endMinutes = 24 * 60; // 设为当天结束
    }
    
    // 处理跨天的情况
    if (endMinutes < currentMinutes && activity.startTime > activity.endTime) {
      endMinutes += 24 * 60; // 加一天
    }
    
    const minutesLeft = endMinutes - currentMinutes;
    
    // 确保剩余时间不为负
    if (minutesLeft <= 0) {
      return "即将结束";
    }
    
    // 格式化剩余时间
    if (minutesLeft < 60) {
      return `${minutesLeft} 分钟`;
    } else {
      const hours = Math.floor(minutesLeft / 60);
      const mins = minutesLeft % 60;
      return `${hours} 小时 ${mins} 分钟`;
    }
  };

  // 查找下一个活动
  const findNextActivity = (currentId) => {
    const nextId = nextActivityMap[currentId];
    if (!nextId) return null;
    
    return activities.find(a => a.id === nextId) || null;
  };

  // 获取随机健康提示
  const getRandomTip = (category) => {
    const tips = healthTips[category] || healthTips.general;
    return tips[Math.floor(Math.random() * tips.length)];
  };

  // 获取当天的中文名称
  const getDayName = (day) => {
    const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return dayNames[day];
  };

  // 获取当前活动状态的颜色
  const getStatusColor = () => {
    if (!currentActivity) return 'bg-gray-200';
    
    if (currentActivity.name.includes("锻炼") || currentActivity.name.includes("骑行")) {
      return 'bg-orange-100';
    } else if (currentActivity.name.includes("放松") || currentActivity.name.includes("冥想")) {
      return 'bg-blue-100';
    } else if (currentActivity.name.includes("工作")) {
      return 'bg-yellow-100';
    } else if (currentActivity.name.includes("兴趣") || currentActivity.name.includes("爱好")) {
      return 'bg-green-100';
    } else if (currentActivity.name.includes("睡")) {
      return 'bg-indigo-100';
    } else if (currentActivity.name.includes("淋浴") || currentActivity.name.includes("浴后")) {
      return 'bg-cyan-100';
    } else if (currentActivity.name.includes("到家") || currentActivity.name.includes("回家")) {
      return 'bg-teal-100';
    } else if (currentActivity.id.includes("wake_up") || currentActivity.id.includes("breakfast")) {
      return 'bg-rose-100';
    } else {
      return 'bg-purple-100';
    }
  };
  
  // 获取进度条颜色
  const getProgressColor = () => {
    if (!currentActivity) return 'bg-gray-400';
    
    if (currentActivity.name.includes("锻炼") || currentActivity.name.includes("骑行")) {
      return 'bg-orange-400';
    } else if (currentActivity.name.includes("放松") || currentActivity.name.includes("冥想")) {
      return 'bg-blue-400';
    } else if (currentActivity.name.includes("工作")) {
      return 'bg-yellow-400';
    } else if (currentActivity.name.includes("兴趣") || currentActivity.name.includes("爱好")) {
      return 'bg-green-400';
    } else if (currentActivity.name.includes("睡")) {
      return 'bg-indigo-400';
    } else if (currentActivity.name.includes("淋浴") || currentActivity.name.includes("浴后")) {
      return 'bg-cyan-400';
    } else if (currentActivity.name.includes("到家") || currentActivity.name.includes("回家")) {
      return 'bg-teal-400';
    } else if (currentActivity.id.includes("wake_up") || currentActivity.id.includes("breakfast")) {
      return 'bg-rose-400';
    } else {
      return 'bg-purple-400';
    }
  };

  // 获取活动项的颜色
  const getActivityItemColor = (activity, isActive) => {
    if (isActive) return 'bg-blue-500 text-white';
    
    if (activity.name.includes("锻炼") || activity.name.includes("骑行")) {
      return 'bg-orange-50 border-orange-200';
    } else if (activity.name.includes("放松") || activity.name.includes("冥想")) {
      return 'bg-blue-50 border-blue-200';
    } else if (activity.name.includes("工作")) {
      return 'bg-yellow-50 border-yellow-200';
    } else if (activity.name.includes("兴趣") || activity.name.includes("爱好")) {
      return 'bg-green-50 border-green-200';
    } else if (activity.name.includes("睡")) {
      return 'bg-indigo-50 border-indigo-200';
    } else if (activity.name.includes("淋浴") || activity.name.includes("浴后")) {
      return 'bg-cyan-50 border-cyan-200';
    } else if (activity.name.includes("到家") || activity.name.includes("回家")) {
      return 'bg-teal-50 border-teal-200';
    } else if (activity.id.includes("wake_up") || activity.id.includes("breakfast")) {
      return 'bg-rose-50 border-rose-200';
    } else {
      return 'bg-purple-50 border-purple-200';
    }
  };

  // 对活动进行分组（用于侧边栏分类显示）
  const groupActivities = (activities) => {
    const groups = [
      { title: "早晨活动", ids: ["sleep", "wake_up", "morning_activity", "personal_hygiene", "breakfast", "get_dressed", "mental_prep", "departure_check", "departure"] },
      { title: "工作时间", ids: ["work_morning", "lunch_wrapup", "mindful_eating", "recovery", "work_prep", "work_afternoon"] },
      { title: "晚间活动", ids: ["home_transition", "evening_exercise", "evening_rest", "shower", "post_shower", "hobby"] },
      { title: "睡前助眠", ids: ["signal_switch", "deep_relaxation", "oral_cleaning", "meditation", "sleep"] }
    ];
    
    return groups.map(group => {
      return {
        ...group,
        activities: activities.filter(activity => group.ids.includes(activity.id))
      };
    });
  };

  // 更新时间和活动状态
  useEffect(() => {
    // 初始化
    const activity = findCurrentActivity();
    setCurrentActivity(activity);
    setProgress(calculateProgress(activity));
    setTimeLeft(calculateTimeLeft(activity));
    setNextActivity(findNextActivity(activity.id));
    setRandomTip(getRandomTip(activity.category));
    setDailyActivities(getDailyActivities());
    
    // 设置定时器
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const activity = findCurrentActivity();
      setCurrentActivity(activity);
      
      const prog = calculateProgress(activity);
      setProgress(prog);
      
      const tLeft = calculateTimeLeft(activity);
      setTimeLeft(tLeft);
      
      const nextAct = findNextActivity(activity.id);
      setNextActivity(nextAct);
      
      // 每30分钟提醒喝水一次
      if (now.getMinutes() === 0 || now.getMinutes() === 30) {
        setIsHydrationReminder(true);
        setTimeout(() => setIsHydrationReminder(false), 15000); // 15秒后隐藏提醒
      }
      
      // 每5分钟更新一次健康提示
      if (now.getMinutes() % 5 === 0 && now.getSeconds() === 0) {
        setRandomTip(getRandomTip(activity.category));
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 侧边栏切换
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // 分组的活动
  const groupedActivities = groupActivities(dailyActivities);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans flex">
      {/* 侧边栏 */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0'} overflow-hidden`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-gray-800">今日活动安排</h2>
            <button 
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(100vh-6rem)]">
            {groupedActivities.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-4">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">{group.title}</h3>
                {group.activities.map((activity) => (
                  <div 
                    key={activity.id}
                    className={`p-3 mb-2 rounded-lg border ${getActivityItemColor(activity, currentActivity && currentActivity.id === activity.id)} transition-colors duration-200`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{activity.name}</span>
                      {currentActivity && currentActivity.id === activity.id && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">进行中</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {activity.startTime} - {activity.endTime}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 主要内容区域 */}
      <div className="flex-1 p-4">
        {/* 主界面标题和侧边栏按钮 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">个人时间助手</h1>
          {!isSidebarOpen && (
            <button 
              onClick={toggleSidebar}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      
        <div className="max-w-2xl mx-auto">
          {/* 日期和时间标题 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-gray-700 mb-2">
              {getDayName(currentTime.getDay())} · {currentTime.toLocaleDateString('zh-CN')}
            </h1>
            <p className="text-4xl font-medium text-gray-800">
              {currentTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
          </div>
          
          {/* 当前活动卡片 */}
          <div className={`rounded-xl shadow-lg p-6 mb-6 transition-all duration-500 ${getStatusColor()}`}>
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-medium text-gray-800">{currentActivity ? currentActivity.name : "加载中..."}</h2>
              <span className="text-sm bg-white bg-opacity-70 rounded-full px-3 py-1 text-gray-700">
                {currentActivity ? `${currentActivity.startTime} - ${currentActivity.endTime}` : ""}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{currentActivity ? currentActivity.description : ""}</p>
            
            {/* 进度条 */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ${getProgressColor()}`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>{currentActivity ? currentActivity.startTime : ""}</span>
              <span>{currentActivity ? `剩余 ${timeLeft}` : ""}</span>
              <span>{currentActivity ? currentActivity.endTime : ""}</span>
            </div>
            
            {/* 活动提示 */}
            <div className="mt-2">
              <h3 className="text-lg font-medium text-gray-700 mb-2">建议:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {currentActivity && currentActivity.tips && currentActivity.tips.map((tip, index) => (
                  <li key={index} className="ml-2">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 下一个活动提示 */}
          {nextActivity && (
            <div className="bg-white bg-opacity-70 rounded-xl shadow-md p-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">接下来:</h3>
                <span className="text-sm bg-gray-100 rounded-full px-3 py-1 text-gray-600">
                  {nextActivity.startTime} 开始
                </span>
              </div>
              <p className="text-gray-700 mt-1">{nextActivity.name}</p>
            </div>
          )}
          
          {/* 与当前活动相关的健康提示 */}
          <div className="bg-blue-50 rounded-xl shadow-md p-4 mb-6">
            <h3 className="text-lg font-medium text-blue-700 mb-2">健康提醒:</h3>
            <p className="text-blue-800">{randomTip}</p>
          </div>
          
          {/* 喝水提醒 - 条件显示 */}
          {isHydrationReminder && (
            <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
              <div className="flex items-center">
                <span className="text-2xl mr-2">💧</span>
                <span>别忘了喝水哦！</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

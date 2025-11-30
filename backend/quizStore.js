// Shared quiz store and question pools
const questionsStore = {}; // stores the last generated quiz per topic
const userStats = {};

// Pre-built questions for each topic (MCQ + Fill-in-the-blank)
const topicQuestions = {
  'network-attacks': [
    {
      id: 'net_mcq_1',
      type: 'mcq',
      text: 'What does DDoS stand for?',
      options: [
        'Domain Denial System',
        'Distributed Denial of Service',
        'Data Delivery Over Socket',
        'Distributed Data Output Service'
      ],
      correctIndex: 1,
      subtopicKey: 'ddos-attacks'
    },
    {
      id: 'net_mcq_2',
      type: 'mcq',
      text: 'Which of the following best describes a DDoS attack?',
      options: [
        'Single system sending normal traffic',
        'Many systems overwhelming a target with traffic',
        'Intercepting communication between two users',
        'Replacing DNS records silently'
      ],
      correctIndex: 1,
      subtopicKey: 'ddos-attacks'
    },
    {
      id: 'net_mcq_3',
      type: 'mcq',
      text: 'Which type of DDoS focuses on exhausting bandwidth?',
      options: [
        'Volumetric attacks',
        'Protocol attacks',
        'Application layer attacks',
        'Physical attacks'
      ],
      correctIndex: 0,
      subtopicKey: 'ddos-attacks'
    },
    {
      id: 'net_mcq_4',
      type: 'mcq',
      text: 'Man-in-the-Middle (MITM) attacks mainly target:',
      options: [
        'Data at rest',
        'Data in transit',
        'Physical hardware',
        'User passwords in a database'
      ],
      correctIndex: 1,
      subtopicKey: 'mitm-attacks'
    },
    {
      id: 'net_mcq_5',
      type: 'mcq',
      text: 'Which technique is commonly used for MITM on local networks?',
      options: [
        'ARP spoofing',
        'Two-factor authentication',
        'Disk encryption',
        'Input validation'
      ],
      correctIndex: 0,
      subtopicKey: 'mitm-attacks'
    },
    {
      id: 'net_mcq_6',
      type: 'mcq',
      text: 'DNS spoofing primarily affects:',
      options: [
        'IP routing tables',
        'Name resolution (domain → IP)',
        'Disk storage',
        'CPU scheduling'
      ],
      correctIndex: 1,
      subtopicKey: 'dns-spoofing'
    },
    {
      id: 'net_mcq_7',
      type: 'mcq',
      text: 'Which of the following helps protect against DNS spoofing?',
      options: [
        'DNSSEC',
        'WPA3',
        'AES disk encryption',
        'Code obfuscation'
      ],
      correctIndex: 0,
      subtopicKey: 'dns-spoofing'
    },
    {
      id: 'net_mcq_8',
      type: 'mcq',
      text: 'A passive network attack is mainly about:',
      options: [
        'Altering packets in transit',
        'Blocking all traffic',
        'Eavesdropping and monitoring',
        'Deleting log files'
      ],
      correctIndex: 2,
      subtopicKey: 'mitm-attacks'
    },
    {
      id: 'net_mcq_9',
      type: 'mcq',
      text: 'Which of these is an active attack?',
      options: [
        'Traffic analysis',
        'Packet sniffing',
        'Service interruption',
        'Log monitoring'
      ],
      correctIndex: 2,
      subtopicKey: 'ddos-attacks'
    },
    {
      id: 'net_mcq_10',
      type: 'mcq',
      text: 'Which security control helps protect data in transit from MITM?',
      options: [
        'HTTPS/TLS',
        'File permissions',
        'Antivirus',
        'Disk quotas'
      ],
      correctIndex: 0,
      subtopicKey: 'mitm-attacks'
    },

    // Fill-in-the-blank
    {
      id: 'net_fill_1',
      type: 'fill',
      text: 'In a man-in-the-middle (MITM) attack, the attacker ______ communications between two parties.',
      answer: 'intercepts',
      subtopicKey: 'mitm-attacks'
    },
    {
      id: 'net_fill_2',
      type: 'fill',
      text: 'DNS spoofing works by providing a fake ______ address for a given domain.',
      answer: 'ip',
      subtopicKey: 'dns-spoofing'
    },
    {
      id: 'net_fill_3',
      type: 'fill',
      text: 'A network attack that tries to make a service unavailable by overwhelming it with traffic is called a ______ attack.',
      answer: 'ddos',
      subtopicKey: 'ddos-attacks'
    },
    {
      id: 'net_fill_4',
      type: 'fill',
      text: 'An attack that only listens to network traffic without modifying it is called a ______ attack.',
      answer: 'passive',
      subtopicKey: 'mitm-attacks'
    },
    {
      id: 'net_fill_5',
      type: 'fill',
      text: 'Using HTTPS instead of HTTP helps prevent ______ attacks on web traffic.',
      answer: 'mitm',
      subtopicKey: 'mitm-attacks'
    },
    {
      id: 'net_fill_6',
      type: 'fill',
      text: 'To validate DNS responses and prevent tampering, the protocol extension ______ can be used.',
      answer: 'dnssec',
      subtopicKey: 'dns-spoofing'
    }
  ]
};

module.exports = {
  topicQuestions,
  questionsStore,
  userStats
};

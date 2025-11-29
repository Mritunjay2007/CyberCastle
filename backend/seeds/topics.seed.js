// Load environment variables from .env
require('dotenv').config();

const mongoose = require('mongoose');
const Topic = require('../models/topic.model');

// Read URI once from env
const MONGODB_URI = process.env.MONGODB_URI;
console.log('MONGODB_URI in seed:', MONGODB_URI);

const topicsData = [
  {
    id: "network-attacks",
    title: "Network Attacks",
    description: "Learn about various network-level attacks and defense mechanisms",
    html: `
      <h2>Network Attacks</h2>
      <p>Network attacks are malicious activities targeting computer networks and the data transmitted across them. Understanding these attacks is crucial for cybersecurity professionals.</p>
      
      <p>As soon as data starts moving across a network, attackers can try to listen to it, modify it, or completely block it. Network attacks range from silent eavesdropping to massive traffic floods that take entire services offline.</p>
      
      <p>This topic gives you the mental model to classify network attacks (passive vs active), recognise common patterns like DDoS and MITM, and connect them to real-world incidents.</p>

      <h3>Overview</h3>
      <p>Network attacks can be categorized into passive and active attacks:</p>
      <ul>
        <li><strong>Passive Attacks:</strong> Eavesdropping, traffic analysis, monitoring</li>
        <li><strong>Active Attacks:</strong> Modification, fabrication, interruption of services</li>
      </ul>
      
      <h3>Common Network Attacks</h3>
      <p>The most prevalent network attacks include:</p>
      <ul>
        <li>DDoS (Distributed Denial of Service)</li>
        <li>Man-in-the-Middle (MITM)</li>
        <li>DNS Spoofing</li>
        <li>ARP Spoofing</li>
        <li>Packet Sniffing</li>
      </ul>

      <h3>What you'll learn</h3>
      <ul>
        <li>The difference between passive and active network attacks</li>
        <li>How DDoS, MITM, and DNS spoofing work in practice</li>
        <li>How encryption, authentication, and DNS security help defend networks</li>
        <li>How to think like an attacker watching or modifying network traffic</li>
      </ul>

      <h3>Scenario</h3>
      <p>Imagine your college website becomes unreachable right before exam results are published. At the same time, some students report that when they open the “results” page, they are redirected to a fake login portal. In this topic, you’ll learn how DDoS and DNS spoofing together can create this kind of chaos.</p>

      <h3>Why It Matters</h3>
      <p>Almost every online service depends on reliable network communication. A single successful network attack can take services offline, steal data in transit, or silently monitor sensitive traffic.</p>
    `,
    subtopics: [
      {
        id: "ddos-attacks",
        title: "DDoS Attacks",
        content: `
          <h3>Distributed Denial of Service (DDoS)</h3>
          <p>A DDoS attack involves multiple compromised systems (a botnet) flooding a target with traffic to overwhelm its resources.</p>
          
          <h4>Types of DDoS:</h4>
          <ul>
            <li><strong>Volumetric Attacks:</strong> Consume bandwidth (UDP floods, DNS amplification)</li>
            <li><strong>Protocol Attacks:</strong> Exploit weaknesses in protocols (SYN floods, fragmented packet attacks)</li>
            <li><strong>Application Layer:</strong> Target web applications (HTTP floods, Slowloris)</li>
          </ul>
          
          <h4>Defense Mechanisms:</h4>
          <ul>
            <li>Rate limiting and traffic filtering</li>
            <li>Anycast network routing</li>
            <li>DDoS mitigation services (Cloudflare, AWS Shield)</li>
            <li>Firewalls and intrusion prevention systems</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Imagine thousands of people calling the same phone number at the same time just to keep it busy. No real conversations happen, but legitimate callers can’t get through. That’s what a DDoS attack does to a server.</p>
        `,
        memoryHooks: [
          "DDoS = many weak machines, one strong impact.",
          "Goal is not to break in, but to shut down access.",
          "Volumetric = bandwidth flood; application = fake user requests."
        ],
        timeline: [
          { year: "2000s", label: "Early large-scale DDoS on major sites" },
          { year: "2016", label: "Mirai botnet abuses IoT devices" }
        ]
      },
      {
        id: "mitm-attacks",
        title: "Man-in-the-Middle (MITM)",
        content: `
          <h3>Man-in-the-Middle Attacks</h3>
          <p>MITM attacks occur when an attacker intercepts communications between two parties, potentially eavesdropping or altering messages.</p>
          
          <h4>Attack Vectors:</h4>
          <ul>
            <li>ARP Spoofing - Manipulating ARP tables</li>
            <li>DNS Spoofing - Redirecting to malicious sites</li>
            <li>SSL Stripping - Downgrading HTTPS to HTTP</li>
            <li>Wi-Fi Eavesdropping - Capturing unencrypted traffic</li>
          </ul>
          
          <h4>Prevention:</h4>
          <ul>
            <li>Use HTTPS/TLS encryption</li>
            <li>Implement certificate pinning</li>
            <li>Use VPNs on public networks</li>
            <li>Enable HSTS (HTTP Strict Transport Security)</li>
            <li>Keep ARP tables static where possible</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Imagine you pass a note to your friend in class, but a third person grabs it, reads it, slightly changes the marks, and then passes it on. Both of you think you’re talking privately, but someone else is secretly in the middle.</p>
        `,
        memoryHooks: [
          "MITM = someone quietly sits between two endpoints.",
          "Without encryption, MITM can read and modify everything.",
          "HTTPS + certificate checks break most simple MITM attempts."
        ],
        timeline: [
          { year: "1990s", label: "Early ARP spoofing tools appear" },
          { year: "2000s", label: "Public Wi-Fi MITM becomes common" }
        ]
      },
      {
        id: "dns-spoofing",
        title: "DNS Spoofing",
        content: `
          <h3>DNS Spoofing</h3>
          <p>DNS spoofing (DNS poisoning) manipulates DNS responses to redirect users to malicious websites.</p>
          
          <h4>How It Works:</h4>
          <p>The attacker intercepts DNS queries and sends forged responses with false IP addresses, causing users to visit fake sites.</p>
          
          <h4>Protection:</h4>
          <ul>
            <li>DNSSEC (DNS Security Extensions)</li>
            <li>DNS query logging and anomaly detection</li>
            <li>Use reputable DNS providers</li>
            <li>Implement DNS filtering</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Think of DNS as the phone directory of the internet. DNS spoofing is like someone secretly swapping the phone numbers in your contact list so that when you call your bank, you actually reach the attacker.</p>
        `,
        memoryHooks: [
          "DNS = internet phonebook; spoofing = fake entry in the book.",
          "You type the right URL but land on the wrong server.",
          "DNSSEC signs records so tampering can be detected."
        ],
        timeline: [
          { year: "1990s", label: "DNS cache poisoning discussed" },
          { year: "2008", label: "Kaminsky bug exposes DNS poisoning risk" }
        ]
      }
    ],
    keyPoints: [
      "DDoS attacks overwhelm systems with traffic",
      "MITM attacks intercept and possibly modify communications",
      "DNS spoofing redirects users to malicious sites",
      "Network attacks can be passive or active",
      "Encryption and authentication prevent many attacks"
    ],
    realWorldAnalogy: `
      <p>Imagine a busy highway system where cars are data packets. Network attacks are like deliberate traffic jams, fake detours, or hidden checkpoints that slow, redirect, or inspect every car without permission.</p>
      <p>A DDoS is a coordinated traffic jam on all lanes, while a MITM attack is like a fake toll booth that reads and changes letters inside every car before letting them pass.</p>
    `,
    discoveryTimeline: [
      {
        year: "1988",
        label: "Morris Worm",
        detail: "One of the first major internet worms, showing how vulnerabilities in network services can spread rapidly."
      },
      {
        year: "2002",
        label: "Large-Scale DDoS",
        detail: "High-profile DDoS attacks on major DNS providers revealed how the internet backbone itself could be targeted."
      },
      {
        year: "2016",
        label: "Mirai Botnet",
        detail: "IoT devices were hijacked to launch massive DDoS attacks, taking down major websites globally."
      }
    ],
    importantFigures: [
      {
        name: "Internet Worm Researchers",
        role: "Early analysis",
        note: "Security pioneers who reverse-engineered the Morris worm and shaped modern incident response practices."
      },
      {
        name: "DDoS Mitigation Engineers",
        role: "Defenders",
        note: "Engineers at CDNs and ISPs who design large-scale protections for critical internet infrastructure."
      }
    ],
    memoryHooks: [
      "Think of DDoS as a traffic jam, not a single crash.",
      "A MITM attack is like someone secretly sitting between two friends and relaying edited messages.",
      "If data moves, someone can sniff, spoof, or stop it.",
      "Passive = watching; Active = changing or breaking."
    ]
  },

  {
    id: "web-application-attacks",
    title: "Web Application Attacks",
    description: "Understanding vulnerabilities in web applications and how to defend them",
    html: `
      <h2>Web Application Attacks</h2>
      <p>Web application attacks target vulnerabilities in web-based software to steal data, deface sites, or gain unauthorized access.</p>
      
      <p>Most of the applications you use daily—banking portals, social media, college ERP systems—are web apps. If input is not handled safely, attackers can inject commands, steal cookies, or trick the browser into doing actions you never intended.</p>
      
      <p>This topic helps you relate the OWASP Top 10 to real code and real HTTP requests, instead of just memorising buzzwords.</p>

      <h3>Top Web Application Vulnerabilities (OWASP Top 10)</h3>
      <ul>
        <li>SQL Injection</li>
        <li>Cross-Site Scripting (XSS)</li>
        <li>Cross-Site Request Forgery (CSRF)</li>
        <li>Broken Authentication</li>
        <li>Sensitive Data Exposure</li>
        <li>XML External Entities (XXE)</li>
        <li>Broken Access Control</li>
        <li>Using Components with Known Vulnerabilities</li>
        <li>Insufficient Logging and Monitoring</li>
        <li>Server-Side Template Injection</li>
      </ul>

      <h3>What you'll learn</h3>
      <ul>
        <li>How SQL injection, XSS, and CSRF work at HTTP/request level</li>
        <li>How to defend using parameterized queries, encoding, and CSRF tokens</li>
        <li>How OWASP Top 10 connects to exam questions and interview scenarios</li>
      </ul>

      <h3>Scenario</h3>
      <p>Imagine your college feedback site lets students submit comments. Suddenly, when teachers view the comments, their sessions get hijacked and grades are changed. This topic will help you recognise that as XSS + broken session handling, and think about how to fix it.</p>

      <h3>Why It Matters</h3>
      <p>Most modern applications are web-based. A single vulnerability can expose millions of user accounts and highly sensitive data.</p>
    `,
    subtopics: [
      {
        id: "sql-injection",
        title: "SQL Injection",
        content: `
          <h3>SQL Injection</h3>
          <p>SQL injection is a code injection technique where attackers insert malicious SQL statements into input fields.</p>
          
          <h4>Prevention:</h4>
          <ul>
            <li>Use prepared statements and parameterized queries</li>
            <li>Input validation and sanitization</li>
            <li>Implement least privilege database access</li>
            <li>Use ORM frameworks</li>
            <li>Web Application Firewalls (WAF)</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Imagine you tell a librarian “Give me the book titled ‘Security’”. Now imagine you say “Give me all books and burn the library”. If the librarian blindly executes your words as commands, that’s like SQL injection in a database.</p>
        `,
        memoryHooks: [
          "SQLi = user input becomes part of the query code.",
          "Never build queries by string concatenation.",
          "Parameterized queries treat input as data, not instructions."
        ],
        timeline: [
          { year: "1998", label: "Early SQL injection discussions" },
          { year: "2000s", label: "High-profile SQLi data breaches" }
        ]
      },
      {
        id: "xss-attacks",
        title: "Cross-Site Scripting (XSS)",
        content: `
          <h3>Cross-Site Scripting (XSS)</h3>
          <p>XSS attacks inject malicious scripts into web pages viewed by other users.</p>
          
          <h4>Types:</h4>
          <ul>
            <li><strong>Stored XSS:</strong> Malicious script stored in the database</li>
            <li><strong>Reflected XSS:</strong> Script reflected in URL parameters</li>
            <li><strong>DOM-based XSS:</strong> Exploits client-side JavaScript</li>
          </ul>
          
          <h4>Defense:</h4>
          <ul>
            <li>Input validation and output encoding</li>
            <li>Content Security Policy (CSP)</li>
            <li>Use security libraries/frameworks</li>
            <li>Regular security audits</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Imagine a public notice board where anyone can post messages. XSS is like someone posting a note that releases a gas every time someone reads it—hurting every viewer, not just the one who posted.</p>
        `,
        memoryHooks: [
          "XSS = attacker code runs in the victim’s browser.",
          "Stored XSS lives in DB; reflected XSS lives in the URL.",
          "Output encoding makes scripts print as text, not run as code."
        ],
        timeline: [
          { year: "2000s", label: "XSS widely recognised as major web risk" },
          { year: "2010s", label: "CSP and modern frameworks reduce XSS" }
        ]
      },
      {
        id: "csrf-attacks",
        title: "Cross-Site Request Forgery (CSRF)",
        content: `
          <h3>Cross-Site Request Forgery (CSRF)</h3>
          <p>CSRF tricks authenticated users into performing unwanted actions on their behalf.</p>
          
          <h4>Prevention:</h4>
          <ul>
            <li>CSRF tokens in forms</li>
            <li>SameSite cookie attribute</li>
            <li>Verify origin and referer headers</li>
            <li>Re-authentication for sensitive operations</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Think of CSRF like forging someone’s signature on a cheque. The bank thinks the real person authorised it because the signature (cookie) is valid, but the intention is fake.</p>
        `,
        memoryHooks: [
          "CSRF: user is real, intent is fake.",
          "Browser automatically adds cookies, even for attacker-crafted requests.",
          "CSRF tokens prove that a request came from your own site."
        ],
        timeline: [
          { year: "2000s", label: "CSRF documented and formalised" },
          { year: "2010s", label: "SameSite cookies become common defence" }
        ]
      }
    ],
    keyPoints: [
      "SQL injection allows direct database manipulation",
      "XSS enables script injection attacks in users' browsers",
      "CSRF exploits user authentication and trust in cookies",
      "Input validation and output encoding are critical defenses",
      "Secure frameworks and OWASP guidelines reduce risk"
    ],
    realWorldAnalogy: `
      <p>Think of a web application as a building with doors, windows, and lifts. Users are visitors, and inputs are what they bring inside.</p>
      <p>SQL injection is like someone tricking the receptionist into opening the safe by cleverly phrasing a request. XSS is like someone writing a malicious note on the notice board that harms everyone who reads it.</p>
    `,
    discoveryTimeline: [
      {
        year: "1998",
        label: "Early SQL Injection",
        detail: "One of the earliest public discussions of SQL injection appeared, making developers aware of input-based database attacks."
      },
      {
        year: "2001",
        label: "OWASP Founded",
        detail: "The Open Web Application Security Project began providing community-driven guidance for web security."
      },
      {
        year: "2003+",
        label: "OWASP Top 10",
        detail: "The OWASP Top 10 list became a standard reference for the most critical web application security risks."
      }
    ],
    importantFigures: [
      {
        name: "OWASP Community",
        role: "Standard setters",
        note: "Volunteers and experts who maintain the OWASP Top 10 and best practices for secure coding."
      },
      {
        name: "Application Security Engineers",
        role: "Practitioners",
        note: "Engineers who integrate secure coding, code reviews, and automated scanning into development pipelines."
      }
    ],
    memoryHooks: [
      "Never trust user input, always validate and sanitize.",
      "SQLi attacks the database; XSS attacks the user's browser.",
      "CSRF = user is real, intention is fake.",
      "OWASP Top 10 is the exam cheat-sheet for web app risks."
    ]
  },

  {
    id: "authentication-attacks",
    title: "Authentication Attacks",
    description: "Learn about attacks targeting authentication mechanisms",
    html: `
      <h2>Authentication Attacks</h2>
      <p>Authentication attacks aim to bypass, crack, or compromise authentication systems to gain unauthorized access.</p>
      
      <p>Instead of breaking complex cryptography, attackers often go after passwords, reused credentials, and careless users who click the wrong link. Once an attacker is “logged in”, many other security checks are bypassed.</p>
      
      <p>This topic covers the classic attacks on login systems and what modern defenses (like MFA) actually protect against.</p>

      <h3>Common Authentication Attack Types</h3>
      <ul>
        <li>Brute Force Attacks</li>
        <li>Dictionary Attacks</li>
        <li>Credential Stuffing</li>
        <li>Phishing</li>
        <li>Password Spraying</li>
        <li>Keylogging</li>
      </ul>

      <h3>What you'll learn</h3>
      <ul>
        <li>The difference between brute force, password spraying, and credential stuffing</li>
        <li>How phishing fits into authentication attacks</li>
        <li>How MFA, lockouts, and monitoring reduce these risks</li>
      </ul>

      <h3>Scenario</h3>
      <p>Your friend uses the same email-password pair for college ERP, social media, and a random gaming site. That gaming site gets hacked, and suddenly someone logs into his college account and changes his phone number. In this topic, you’ll see why this is a classic credential stuffing problem.</p>

      <h3>Why It Matters</h3>
      <p>Compromising authentication often means full account takeover. Once attackers are “logged in”, many other defenses are bypassed.</p>
    `,
    subtopics: [
      {
        id: "brute-force",
        title: "Brute Force Attacks",
        content: `
          <h3>Brute Force Attacks</h3>
          <p>Attackers try all possible password combinations until finding the correct one.</p>
          
          <h4>Defense:</h4>
          <ul>
            <li>Account lockout after failed attempts</li>
            <li>CAPTCHA challenges</li>
            <li>Rate limiting</li>
            <li>Strong password requirements</li>
            <li>Multi-factor authentication (MFA)</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Imagine trying every possible 4-digit PIN on an ATM, one after another, until it opens. Brute force is that same idea, automated and much faster.</p>
        `,
        memoryHooks: [
          "Brute force = try every combination until something works.",
          "Lockouts + rate limiting = kill brute force speed.",
          "Long random passwords explode the search space."
        ],
        timeline: [
          { year: "1960s", label: "Early password cracking on mainframes" },
          { year: "2000s", label: "GPU-based brute force increases speed" }
        ]
      },
      {
        id: "credential-stuffing",
        title: "Credential Stuffing",
        content: `
          <h3>Credential Stuffing</h3>
          <p>Attackers use leaked username-password pairs from previous breaches to gain access to other accounts.</p>
          
          <h4>Prevention:</h4>
          <ul>
            <li>Implement MFA</li>
            <li>Monitor for leaked credentials</li>
            <li>Use unique passwords for every service</li>
            <li>Implement CAPTCHA</li>
            <li>Behavioral and anomaly analysis</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Think of a thief who finds a bag of keys from one apartment building and then tries those same keys on every flat in the city. Credential stuffing relies on people reusing the same “key” (password) everywhere.</p>
        `,
        memoryHooks: [
          "One leaked password reused everywhere = many hacked accounts.",
          "Credential stuffing uses known pairs, not random guessing.",
          "MFA breaks the value of stolen passwords."
        ],
        timeline: [
          { year: "2010s", label: "Massive password dumps fuel credential stuffing" }
        ]
      },
      {
        id: "phishing",
        title: "Phishing Attacks",
        content: `
          <h3>Phishing Attacks</h3>
          <p>Phishing tricks users into revealing credentials through deceptive emails or websites.</p>
          
          <h4>Protection:</h4>
          <ul>
            <li>User awareness training</li>
            <li>Email filtering and validation</li>
            <li>Multi-factor authentication</li>
            <li>Domain authentication (DKIM, SPF, DMARC)</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Phishing is like someone calling you pretending to be from your bank, asking for your OTP “to verify your account”. The phone number looks convincing, but the person is a fraud.</p>
        `,
        memoryHooks: [
          "Phishing attacks humans, not servers.",
          "Urgent + emotional + asks for secrets = likely phishing.",
          "MFA reduces damage but doesn’t remove the need for awareness."
        ],
        timeline: [
          { year: "2000s", label: "Email phishing waves targeting banks" },
          { year: "2010s", label: "Spear-phishing targets executives and admins" }
        ]
      }
    ],
    keyPoints: [
      "Brute force cracks passwords through exhaustive attempts",
      "Credential stuffing reuses leaked username–password pairs",
      "Phishing targets humans, not machines",
      "Multi-factor authentication (MFA) is a strong protection",
      "Rate limiting and lockouts reduce guessing attacks"
    ],
    realWorldAnalogy: `
      <p>Imagine a secure building with a keypad lock.</p>
      <ul>
        <li>Brute force is like trying every 4-digit PIN from 0000 to 9999.</li>
        <li>Credential stuffing is using keys stolen from one building to try on many other buildings.</li>
        <li>Phishing is tricking the security guard into opening the door for you.</li>
      </ul>
      <p>MFA is like requiring both a key card and a fingerprint—not just one factor.</p>
    `,
    discoveryTimeline: [
      {
        year: "1960s",
        label: "Early Password Systems",
        detail: "Mainframes used simple password systems that were quickly studied and attacked."
      },
      {
        year: "2000s",
        label: "Mass Phishing",
        detail: "Email became the main transport for large-scale phishing campaigns targeting banking and webmail accounts."
      },
      {
        year: "2010s+",
        label: "Mega Breaches & Credential Stuffing",
        detail: "Large data breaches leaked billions of credentials, fueling automated credential-stuffing attacks."
      }
    ],
    importantFigures: [
      {
        name: "Identity & Access Management (IAM) Engineers",
        role: "Designers of auth systems",
        note: "Focus on secure login flows, MFA, and session management."
      },
      {
        name: "Security Awareness Trainers",
        role: "Human firewall builders",
        note: "Educate users to recognize phishing and suspicious login prompts."
      }
    ],
    memoryHooks: [
      "If one password is reused everywhere, one breach becomes many breaches.",
      "Something you know + something you have + something you are = strong MFA.",
      "Attackers don’t guess random passwords anymore; they reuse leaked ones.",
      "Phishing is social engineering aimed at login credentials."
    ]
  },

  {
    id: "social-engineering",
    title: "Social Engineering",
    description: "Psychological manipulation techniques used in cyber attacks",
    html: `
      <h2>Social Engineering</h2>
      <p>Social engineering manipulates human psychology to trick people into revealing confidential information or performing security-violating actions.</p>
      
      <p>Even if your firewalls, encryption, and patches are perfect, a single employee can still be convinced to share a password, plug in a USB drive, or hold a door open. Social engineering is the art of hacking people instead of machines.</p>
      
      <p>This topic helps you recognise common tricks so you can become much harder to fool.</p>

      <h3>Social Engineering Tactics</h3>
      <ul>
        <li>Phishing and Spear Phishing</li>
        <li>Pretexting</li>
        <li>Baiting</li>
        <li>Tailgating</li>
        <li>Reverse Social Engineering</li>
        <li>Vishing (Voice Phishing)</li>
      </ul>

      <h3>What you'll learn</h3>
      <ul>
        <li>Key psychological levers used by attackers (fear, urgency, curiosity, authority)</li>
        <li>Common patterns of phishing, pretexting, and baiting</li>
        <li>How to respond safely when something feels “off”</li>
      </ul>

      <h3>Scenario</h3>
      <p>You receive an email from “IT Support” saying your account will be deleted in 30 minutes unless you click a link and log in. The logo looks correct, the email address is slightly suspicious, and the link is shortened. This topic trains you to notice these red flags before you click.</p>

      <h3>Why It Matters</h3>
      <p>Even the strongest technical defenses fail if attackers can simply convince a person to bypass them.</p>
    `,
    subtopics: [
      {
        id: "phishing-tactics",
        title: "Phishing Tactics",
        content: `
          <h3>Phishing Tactics</h3>
          <p>Phishing is sending deceptive emails pretending to be from trusted sources.</p>
          
          <h4>Red Flags:</h4>
          <ul>
            <li>Urgent language and threats</li>
            <li>Suspicious sender addresses</li>
            <li>Links with misleading URLs</li>
            <li>Requests for passwords or personal info</li>
            <li>Grammar and spelling errors</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Phishing emails are like fake letters from your bank asking you to “confirm your PIN” or lose your account. The letterhead looks official, but the sender is a criminal.</p>
        `,
        memoryHooks: [
          "Urgent + emotional + asks for secrets = likely phishing.",
          "Hover links; don’t trust what is written, trust the actual URL.",
          "Banks and services rarely ask for your full password via email."
        ],
        timeline: [
          { year: "2000s", label: "Classic phishing waves target bank logins" },
          { year: "2010s", label: "Spear-phishing targets specific employees" }
        ]
      },
      {
        id: "pretexting",
        title: "Pretexting",
        content: `
          <h3>Pretexting</h3>
          <p>Creating a fabricated scenario to extract information from a target.</p>
          
          <h4>Examples:</h4>
          <ul>
            <li>Posing as IT support</li>
            <li>Fake emergency situations</li>
            <li>Authority impersonation (boss, police, bank)</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Pretexting is like an actor playing a role to gain your trust: “Hi, I’m from the bank’s fraud department. We saw suspicious activity on your card, can you just confirm your OTP?”</p>
        `,
        memoryHooks: [
          "Pretexting = prepared story + fake identity.",
          "Attackers often research victims before pretexting (OSINT).",
          "If someone claims authority, verify using a separate channel."
        ],
        timeline: [
          { year: "Pre-internet", label: "Phone scams and fake officials" },
          { year: "2000s+", label: "Highly targeted pretexts using social media info" }
        ]
      },
      {
        id: "baiting",
        title: "Baiting",
        content: `
          <h3>Baiting</h3>
          <p>Leaving infected USB drives or offers of free software/media to lure victims.</p>
          
          <h4>Defense:</h4>
          <ul>
            <li>Never connect unknown devices</li>
            <li>Disable autorun features</li>
            <li>User training and clear policies</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Baiting is like dropping a pendrive labelled “Confidential Salary Slips” near HR. Curiosity makes someone plug it in, delivering the malware payload.</p>
        `,
        memoryHooks: [
          "If a free device or file feels too juicy, assume bait.",
          "Curiosity and greed are classic baiting triggers.",
          "Technical controls help, but behaviour is the main defence."
        ],
        timeline: [
          { year: "2000s", label: "USB baiting tests in organisations" }
        ]
      }
    ],
    keyPoints: [
      "Social engineering exploits human nature, not software bugs",
      "Phishing is the most common social engineering attack",
      "Pretexting relies on believable stories and fake identities",
      "User training and awareness are the best defenses",
      "Verify requests through a trusted, separate channel"
    ],
    realWorldAnalogy: `
      <p>Think of social engineering like classic cons or scams in the physical world.</p>
      <ul>
        <li>Phishing email = fake bank officer calling you for your PIN.</li>
        <li>Tailgating = someone walking behind you to enter a secure door without a badge.</li>
        <li>Baiting = dropping a free “gift” pen drive near the office entrance.</li>
      </ul>
    `,
    discoveryTimeline: [
      {
        year: "Pre-Internet",
        label: "Confidence Tricks",
        detail: "Long before computers, con artists used similar psychological tricks to deceive people."
      },
      {
        year: "1980s–1990s",
        label: "Phone Phreaking & Early Hacks",
        detail: "Attackers used phone calls and basic tech knowledge to gain unauthorized access."
      },
      {
        year: "2000s+",
        label: "Mass Phishing Campaigns",
        detail: "Email and social media allowed social engineering to scale to millions of victims."
      }
    ],
    importantFigures: [
      {
        name: "Security Awareness Professionals",
        role: "Trainers",
        note: "Develop simulations and training programs to build a ‘human firewall’."
      },
      {
        name: "Penetration Testers",
        role: "Ethical attackers",
        note: "Often perform controlled social engineering tests to measure organizational resilience."
      }
    ],
    memoryHooks: [
      "Hackers don’t always hack computers; they hack people.",
      "If a message feels urgent and emotional, slow down and verify.",
      "Trust, curiosity, fear, and greed are the main levers in social engineering.",
      "When in doubt: verify using another channel (phone call, in person)."
    ]
  },

  {
    id: "malware",
    title: "Malware",
    description: "Malicious software types, detection, and removal",
    html: `
      <h2>Malware</h2>
      <p>Malware is software designed to cause harm, steal data, or gain unauthorized access to systems.</p>
      
      <p>Instead of just memorising names like virus, worm, trojan, and ransomware, you need to understand how each behaves, how it spreads, and what security layers can detect and contain them.</p>
      
      <p>This topic connects real-world malware outbreaks with the underlying concepts exam questions are built on.</p>

      <h3>Types of Malware</h3>
      <ul>
        <li>Viruses - Replicate by attaching to files</li>
        <li>Worms - Self-replicating and spread over networks</li>
        <li>Trojans - Disguised as legitimate software</li>
        <li>Ransomware - Encrypts data and demands payment</li>
        <li>Spyware - Monitors user activity</li>
        <li>Adware - Displays unwanted advertisements</li>
        <li>Rootkits - Gain root/admin access</li>
        <li>Botnets - Networks of compromised machines</li>
      </ul>

      <h3>What you'll learn</h3>
      <ul>
        <li>The behavioural differences between viruses, worms, trojans, and ransomware</li>
        <li>Common infection vectors (email, downloads, USB, vulnerabilities)</li>
        <li>How backups, patching, and endpoint protection reduce malware risk</li>
      </ul>

      <h3>Scenario</h3>
      <p>The college lab suddenly shows a full-screen message: “Your files have been encrypted. Pay 2 BTC to get them back.” Shared drives are locked and classes are cancelled. In this topic, you learn how this happens and what should have been done before the attack.</p>

      <h3>Why It Matters</h3>
      <p>Malware can lead to data loss, financial damage, privacy violations, and complete system compromise.</p>
    `,
    subtopics: [
      {
        id: "viruses-worms",
        title: "Viruses and Worms",
        content: `
          <h3>Viruses and Worms</h3>
          
          <h4>Viruses:</h4>
          <ul>
            <li>Require host file to spread</li>
            <li>Execute when host program runs</li>
            <li>Typically slower propagation</li>
          </ul>
          
          <h4>Worms:</h4>
          <ul>
            <li>Self-contained and independent</li>
            <li>Spread through networks automatically</li>
            <li>No host file needed</li>
            <li>Examples: Conficker, Morris Worm</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Think of a virus as a note scribbled on your textbook pages—it spreads only when that book is shared. A worm is like a rumour that jumps person to person in the corridor without needing the book at all.</p>
        `,
        memoryHooks: [
          "Virus needs a host file; worm travels alone.",
          "Virus spreads when users execute something; worms spread when systems connect.",
          "Worms love unpatched network services."
        ],
        timeline: [
          { year: "1980s", label: "Early PC viruses on floppy disks" },
          { year: "2000s", label: "Email and network worms (ILOVEYOU, Conficker)" }
        ]
      },
      {
        id: "ransomware",
        title: "Ransomware",
        content: `
          <h3>Ransomware</h3>
          <p>Ransomware encrypts user data and demands payment for decryption keys.</p>
          
          <h4>Protection:</h4>
          <ul>
            <li>Regular offline and cloud backups</li>
            <li>Email filtering and safe browsing</li>
            <li>Keep software updated</li>
            <li>User training</li>
            <li>Endpoint protection and EDR tools</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Ransomware is like a criminal who locks every room in your house, keeps the keys, and asks for money to return them. Your things are still inside, but you can’t reach them.</p>
        `,
        memoryHooks: [
          "No backups = high pressure to pay ransom.",
          "Ransomware attacks availability, often plus confidentiality (data leaks).",
          "Backups + segmentation = ability to say NO to ransom."
        ],
        timeline: [
          { year: "1989", label: "AIDS Trojan – early ransomware idea" },
          { year: "2017", label: "WannaCry hits hospitals and companies globally" }
        ]
      },
      {
        id: "trojans",
        title: "Trojans",
        content: `
          <h3>Trojans</h3>
          <p>Trojans disguise themselves as legitimate software but contain malicious code.</p>
          
          <h4>Types:</h4>
          <ul>
            <li>Remote Access Trojans (RAT)</li>
            <li>Trojan Downloaders</li>
            <li>Trojan Droppers</li>
            <li>Backdoor Trojans</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Like the wooden horse of Troy, a trojan is something you willingly bring inside your system, believing it is safe, while attackers are hiding inside ready to act.</p>
        `,
        memoryHooks: [
          "Trojans rely on trust and curiosity, not just exploits.",
          "The victim installs the trojan themselves.",
          "Legit-looking installer, malicious behaviour."
        ],
        timeline: [
          { year: "2000s", label: "Banking trojans steal credentials" },
          { year: "2010s", label: "RATs used in targeted attacks" }
        ]
      }
    ],
    keyPoints: [
      "Viruses attach to host files and need user action to run",
      "Worms spread autonomously across networks",
      "Trojans masquerade as legitimate software to trick users",
      "Ransomware encrypts data and demands payment",
      "Regular backups and antivirus are essential defenses"
    ],
    realWorldAnalogy: `
      <p>Think of malware like different kinds of infections in a city.</p>
      <ul>
        <li>Virus = a disease that spreads when infected items are shared.</li>
        <li>Worm = an airborne virus that spreads automatically through the air (network).</li>
        <li>Trojan = a gift box with a hidden bomb inside.</li>
        <li>Ransomware = a criminal locking all your rooms and asking for ransom for the keys.</li>
      </ul>
    `,
    discoveryTimeline: [
      {
        year: "1980s",
        label: "Early PC Viruses",
        detail: "Boot sector and file-infecting viruses spread via floppy disks."
      },
      {
        year: "2000s",
        label: "Email Worms",
        detail: "Worms spread rapidly via email attachments and network shares."
      },
      {
        year: "2010s+",
        label: "Ransomware Era",
        detail: "Ransomware attacks on individuals, hospitals, and companies caused huge financial and operational damage."
      }
    ],
    importantFigures: [
      {
        name: "Antivirus Researchers",
        role: "Malware analysts",
        note: "Reverse-engineer malicious code and create signatures, heuristics, and detection techniques."
      },
      {
        name: "Incident Response Teams",
        role: "First responders",
        note: "Contain outbreaks, restore systems, and reduce the impact of malware infections."
      }
    ],
    memoryHooks: [
      "Virus needs a host file; worm travels alone.",
      "Trojans rely on user trust, not exploits.",
      "No backups + ransomware = big trouble.",
      "Malware often enters via email, downloads, or unpatched systems."
    ]
  },

  {
    id: "wireless-attacks",
    title: "Wireless Attacks",
    description: "Security threats in wireless networks and prevention",
    html: `
      <h2>Wireless Attacks</h2>
      <p>Wireless networks face unique security challenges due to their broadcast nature and accessibility.</p>
      
      <p>Because Wi-Fi signals travel through the air, not cables, anyone within range can listen and attempt attacks, even from the parking lot or the building next door. Weak encryption or fake access points can expose entire internal networks.</p>
      
      <p>This topic gives you the vocabulary to talk about Wi-Fi security configurations, attack types, and realistic defences.</p>

      <h3>Common Wireless Attack Types</h3>
      <ul>
        <li>War Driving</li>
        <li>Evil Twin Networks</li>
        <li>Packet Sniffing</li>
        <li>Weak Encryption Attacks</li>
        <li>WPS Vulnerabilities</li>
        <li>Jamming</li>
      </ul>

      <h3>What you'll learn</h3>
      <ul>
        <li>The differences between WEP, WPA2, and WPA3</li>
        <li>How evil twin and packet sniffing attacks work</li>
        <li>Practical steps to secure home and campus Wi-Fi</li>
      </ul>

      <h3>Scenario</h3>
      <p>You sit in a café and connect to “FreeCafeWiFi”. Unknown to you, an attacker set up that hotspot with the same name, and is now capturing all unencrypted traffic. This topic helps you understand how that happens and how VPN + HTTPS protect you.</p>

      <h3>Why It Matters</h3>
      <p>Anyone within range of a Wi-Fi network can attempt attacks, so misconfiguration or weak encryption can expose entire internal networks.</p>
    `,
    subtopics: [
      {
        id: "wifi-security",
        title: "Wi-Fi Security",
        content: `
          <h3>Wi-Fi Security</h3>
          
          <h4>Encryption Standards:</h4>
          <ul>
            <li><strong>WEP:</strong> Outdated, easily cracked</li>
            <li><strong>WPA:</strong> Improved security over WEP</li>
            <li><strong>WPA2:</strong> Widely used with strong encryption (AES)</li>
            <li><strong>WPA3:</strong> Latest standard with enhanced security</li>
          </ul>
          
          <h4>Security Best Practices:</h4>
          <ul>
            <li>Use strong, unique Wi-Fi passwords</li>
            <li>Enable WPA3 or at least WPA2</li>
            <li>Hide SSID broadcasting where appropriate</li>
            <li>Disable WPS (Wi-Fi Protected Setup)</li>
            <li>Enable MAC filtering with caution</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Think of Wi-Fi encryption as the type of lock on your front door. WEP is like a lock that can be opened with a hairpin; WPA2/WPA3 are like modern locks that resist simple tools.</p>
        `,
        memoryHooks: [
          "For exams: WEP = bad; WPA2/WPA3 = good.",
          "WPA3 improves protection even with weak passwords.",
          "Router defaults are often insecure—configure them consciously."
        ],
        timeline: [
          { year: "Late 1990s", label: "WEP introduced for early Wi-Fi" },
          { year: "2003–2004", label: "WPA/WPA2 replace broken WEP" },
          { year: "2018+", label: "WPA3 announced and adopted" }
        ]
      },
      {
        id: "evil-twin",
        title: "Evil Twin Networks",
        content: `
          <h3>Evil Twin Networks</h3>
          <p>Attackers create fake Wi-Fi networks mimicking legitimate ones to intercept traffic.</p>
          
          <h4>Defense:</h4>
          <ul>
            <li>Use VPN on public Wi-Fi</li>
            <li>Verify network names with staff or signage</li>
            <li>Avoid sensitive transactions on open networks</li>
            <li>Keep firewall enabled</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>An evil twin is like a fake shop that looks exactly like your favourite café from the outside, but is actually run by criminals who record all conversations and card payments.</p>
        `,
        memoryHooks: [
          "Same SSID doesn’t mean same owner.",
          "Public places: always assume evil twin may exist.",
          "VPN + HTTPS protect even if Wi-Fi is malicious."
        ],
        timeline: [
          { year: "2000s", label: "Evil twin demos at security conferences" }
        ]
      },
      {
        id: "packet-sniffing",
        title: "Packet Sniffing",
        content: `
          <h3>Packet Sniffing</h3>
          <p>Capturing and analyzing network packets to extract sensitive information.</p>
          
          <h4>Prevention:</h4>
          <ul>
            <li>Use HTTPS/TLS encryption</li>
            <li>Use VPNs on untrusted networks</li>
            <li>SSH for remote access instead of Telnet</li>
            <li>Disable unencrypted legacy protocols</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Packet sniffing is like a person with binoculars and a recorder, sitting in the middle of a busy street, quietly listening to every conversation they can hear.</p>
        `,
        memoryHooks: [
          "Sniffers see everything that isn’t encrypted.",
          "TLS/HTTPS turn readable traffic into gibberish for sniffers.",
          "Legacy protocols (FTP, Telnet) leak credentials in plain text."
        ],
        timeline: [
          { year: "1990s", label: "Sniffer tools become widely available" }
        ]
      }
    ],
    keyPoints: [
      "Wi-Fi networks broadcast signals that attackers can capture",
      "WEP is insecure; WPA2/WPA3 are recommended",
      "Evil twin networks impersonate legitimate SSIDs",
      "VPNs help protect wireless traffic on untrusted networks",
      "Strong encryption and configuration prevent many wireless attacks"
    ],
    realWorldAnalogy: `
      <p>Imagine talking loudly in a crowded coffee shop—anyone nearby can hear you.</p>
      <ul>
        <li>Unencrypted Wi-Fi = shouting secrets in public.</li>
        <li>Evil twin = a fake shop that looks identical to the real one, tricking you to enter and talk there.</li>
        <li>Strong encryption = speaking in a private coded language that only your friend understands.</li>
      </ul>
    `,
    discoveryTimeline: [
      {
        year: "Late 1990s",
        label: "Early Wi-Fi & WEP",
        detail: "First wireless networks used WEP, later found to be easily broken."
      },
      {
        year: "2003–2004",
        label: "WPA/WPA2 Introduction",
        detail: "New encryption standards were introduced to fix weaknesses in WEP."
      },
      {
        year: "2018+",
        label: "WPA3",
        detail: "WPA3 improves security even on weak passwords and public networks."
      }
    ],
    importantFigures: [
      {
        name: "Wireless Security Researchers",
        role: "Attack & defense",
        note: "Discovered weaknesses in WEP/WPA and designed better protocols."
      },
      {
        name: "Network Administrators",
        role: "Implementers",
        note: "Configure enterprise Wi-Fi securely and monitor for rogue access points."
      }
    ],
    memoryHooks: [
      "If anyone can hear the signal, anyone can attack it.",
      "WEP = weak; WPA2/WPA3 = strong (for exams, always prefer WPA3).",
      "Evil twin: same name, wrong network.",
      "VPN turns any Wi-Fi into a private tunnel."
    ]
  },

  {
    id: "basic-security-issues",
    title: "Basic Security Issues",
    description: "Fundamental security vulnerabilities and common mistakes",
    html: `
      <h2>Basic Security Issues</h2>
      <p>Many security breaches occur due to basic security oversights and poor practices.</p>
      
      <p>Attackers often don’t need zero-day exploits or advanced hacking tools. Weak passwords, unchanged default credentials, missing patches, and no backups are usually enough to get in and cause serious damage.</p>
      
      <p>This topic focuses on simple but powerful habits that dramatically improve security in real environments.</p>

      <h3>Common Basic Security Problems</h3>
      <ul>
        <li>Weak Passwords</li>
        <li>Default Credentials</li>
        <li>Unpatched Systems</li>
        <li>Lack of Updates</li>
        <li>No Backups</li>
        <li>Unsecured Devices</li>
        <li>Poor Access Control</li>
        <li>Inadequate Monitoring</li>
      </ul>

      <h3>What you'll learn</h3>
      <ul>
        <li>Why weak passwords and default credentials are so dangerous</li>
        <li>How unpatched systems turn known bugs into active vulnerabilities</li>
        <li>How backups and monitoring change the impact of incidents</li>
      </ul>

      <h3>Scenario</h3>
      <p>A small college server still uses “admin/admin” as its login, automatic updates are disabled, and backups haven’t been checked in months. One ransomware infection later, all exam papers and student records are locked. This topic shows how basic hygiene could have prevented or softened this disaster.</p>

      <h3>Why It Matters</h3>
      <p>Attackers often don’t need advanced exploits—simple misconfigurations and laziness are enough to break in.</p>
    `,
    subtopics: [
      {
        id: "weak-passwords",
        title: "Weak Passwords",
        content: `
          <h3>Weak Passwords</h3>
          <p>Simple, easy-to-guess passwords are the primary cause of account breaches.</p>
          
          <h4>Strong Password Guidelines:</h4>
          <ul>
            <li>Minimum 12 characters (longer is better)</li>
            <li>Mix of uppercase, lowercase, numbers, and symbols</li>
            <li>Avoid dictionary words and personal info</li>
            <li>Use unique passwords for each account</li>
            <li>Use a password manager where possible</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>A weak password is like a cheap lock that can be opened with almost any key. A strong password is more like a complex safe combination that takes serious effort to crack.</p>
        `,
        memoryHooks: [
          "If you can remember it easily and it’s short, it’s probably weak.",
          "Length beats complexity: longer passphrases are powerful.",
          "Reused password = one key that opens many doors."
        ],
        timeline: [
          { year: "Early computing", label: "Short, simple passwords common" },
          { year: "2000s", label: "Password cracking tools become easy to use" }
        ]
      },
      {
        id: "default-credentials",
        title: "Default Credentials",
        content: `
          <h3>Default Credentials</h3>
          <p>Leaving default usernames and passwords on devices/services is a critical vulnerability.</p>
          
          <h4>Examples:</h4>
          <ul>
            <li>admin/admin</li>
            <li>root/root</li>
            <li>admin/password</li>
          </ul>
          
          <h4>Always:</h4>
          <ul>
            <li>Change default credentials immediately</li>
            <li>Document new credentials securely</li>
            <li>Review and disable unnecessary default accounts</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Default credentials are like a factory lock where everyone in the world knows the master key. Attackers don’t need to guess—they already know the combination.</p>
        `,
        memoryHooks: [
          "If you didn’t change it, attackers already know it.",
          "First setup step: change defaults, then configure everything else.",
          "Search engines can find devices with known defaults exposed online."
        ],
        timeline: [
          { year: "Early networking", label: "Devices shipped with simple defaults" },
          { year: "2010s", label: "IoT botnets harvest devices with default logins" }
        ]
      },
      {
        id: "unpatched-systems",
        title: "Unpatched Systems",
        content: `
          <h3>Unpatched Systems</h3>
          <p>Failing to apply security patches leaves systems vulnerable to known exploits.</p>
          
          <h4>Best Practices:</h4>
          <ul>
            <li>Enable automatic updates where safe</li>
            <li>Apply critical patches promptly</li>
            <li>Test patches in a staging environment when needed</li>
            <li>Maintain an inventory of systems and software versions</li>
            <li>Monitor for newly disclosed high-risk vulnerabilities</li>
          </ul>
        `,
        realWorldAnalogy: `
          <p>Unpatched systems are like broken windows in a house that are never repaired. Once the vulnerability is public, any thief walking by knows exactly where to climb in.</p>
        `,
        memoryHooks: [
          "Patch = turning a known vulnerability into a fixed bug.",
          "Worms often weaponise newly disclosed vulnerabilities quickly.",
          "Patch management is boring but saves organisations from disasters."
        ],
        timeline: [
          { year: "2003", label: "Blaster/Sasser worms hit unpatched Windows systems" },
          { year: "2017", label: "WannaCry exploits unpatched SMB vulnerability" }
        ]
      }
    ],
    keyPoints: [
      "Weak passwords are easily guessed or cracked",
      "Default credentials are widely known to attackers",
      "Unpatched systems are vulnerable to known exploits",
      "Regular updates and backups are essential",
      "Basic hygiene often matters more than advanced tools"
    ],
    realWorldAnalogy: `
      <p>Think of basic security issues like leaving your house unlocked.</p>
      <ul>
        <li>Weak password = a cheap lock that can be opened with any key.</li>
        <li>Default credentials = everyone in the city knows your lock code.</li>
        <li>No updates = ignoring known broken windows and doors.</li>
        <li>No backups = no insurance when everything is stolen or burned.</li>
      </ul>
    `,
    discoveryTimeline: [
      {
        year: "Early Computing",
        label: "Simple Defaults",
        detail: "Systems often shipped with simple default usernames and passwords."
      },
      {
        year: "2000s",
        label: "Patch Exploits",
        detail: "Worms and mass exploitation campaigns targeted systems that failed to apply security patches."
      },
      {
        year: "Today",
        label: "Configuration as Security",
        detail: "Security best practices emphasize secure defaults, hardening, and continuous patch management."
      }
    ],
    importantFigures: [
      {
        name: "System Administrators",
        role: "Frontline defenders",
        note: "Responsible for configuration, patching, backups, and monitoring."
      },
      {
        name: "DevOps / SRE Teams",
        role: "Automation",
        note: "Automate updates, backups, and security baselines at scale."
      }
    ],
    memoryHooks: [
      "Most breaches start with something simple: weak passwords or missing patches.",
      "Security basics + consistency > fancy tools + laziness.",
      "Change defaults, patch quickly, backup regularly.",
      "If it’s easy for you to remember, it might be easy for attackers to guess."
    ]
  }
];

async function seedTopics() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Topic.deleteMany({});
    console.log('Cleared existing topics');

    await Topic.insertMany(topicsData);
    console.log(`Successfully seeded ${topicsData.length} topics`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding topics:', error);
    process.exit(1);
  }
}

seedTopics();

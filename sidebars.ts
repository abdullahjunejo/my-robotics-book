import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Manual sidebar configuration to ensure English and Urdu sync perfectly.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'architecture-spec',
    'intro',                   // 01-intro.md
    'physical-ai-intro',       // physical-ai-intro.md (Aapki special file)
    'gen-ai-robotics',         // 02-gen-ai.md
    'simulation-digital-twin',  // 03-simulation.md
    'robotic-hardware',        // 04-hardware.md
    'locomotion-control',      // 05-locomotion.md
    'robot-perception',        // 06-perception.md
    'robotic-actuation',       // 07-actuation.md
    'ros2-middleware',         // 08-ros2.md
    'rag-robot-brain',         // 09-rag-system.md
    'future-robotics',         // 10-future.md
    
  ],
};

export default sidebars;
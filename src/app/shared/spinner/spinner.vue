<template>
  <span role="progressbar" class="sys-spinner" :style="{ width: `${diameter}px`, height: `${diameter}px` }">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </span>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUpdated } from 'vue';
import { DOCUMENT, platform } from '../helpers/platform';
import { SPINNER_BASE_SIZE_REDUCED, SPINNER_BASE_STROKE_WIDTH } from './types';

interface Props {
  diameter?: number;
  strokeWidth?: number;
  rounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  diameter: SPINNER_BASE_SIZE_REDUCED,
  rounded: false
});

const fallbackAnimation = platform.EDGE || platform.TRIDENT;
const styleRoot = DOCUMENT.head;
const diameters = new Set<number>();

const circleRadius = computed(() => (props.diameter - SPINNER_BASE_STROKE_WIDTH) / 2);
const strokeCircumference = computed(() => 2 * Math.PI * circleRadius.value);
const strokeWidthMethod = computed(() => props.strokeWidth || Math.abs(props.diameter / 10));
const strokeDashOffset = computed(() => (fallbackAnimation ? strokeCircumference.value * 0.2 : null));

const computedStyles = computed(() => ({
  animationName: `sys-spinner-stroke-rotate-${props.diameter}`,
  strokeDashoffset: `${strokeDashOffset.value}px`,
  strokeDasharray: `${strokeCircumference.value}px`,
  strokeWidth: `${props.strokeWidth}%`,
  strokeLinecap: props.rounded ? 'round' : 'butt'
}));

function attachStyleNode() {
  if (diameters.has(props.diameter)) return;

  const styleTag: HTMLStyleElement = DOCUMENT.createElement('style');
  styleTag.setAttribute('sys-spinner-animation', String(props.diameter));
  styleTag.textContent = getAnimationStyles(strokeCircumference.value, props.diameter);
  styleRoot.appendChild(styleTag);
  diameters.add(props.diameter);
}

onMounted(() => {
  attachStyleNode();

  const animationClass = `sys-spinner${fallbackAnimation ? '-fallback' : ''}-animation`;
  (document.querySelector('.sys-spinner') as HTMLElement)?.classList.add(animationClass);
});

onUpdated(attachStyleNode);

const ANIMATION_TEMPLATE = `
 @keyframes sys-spinner-stroke-rotate-DIAMETER {
    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }
    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }
    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }
    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }

    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }
    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }
    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }
    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }

    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }
    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }
    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }
    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }

    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }
    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }
    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }
    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }
  }
`;

function getAnimationStyles(strokeCircumference: number, diameter: number): string {
  return ANIMATION_TEMPLATE.replace(/START_VALUE/g, `${0.95 * strokeCircumference}`)
    .replace(/END_VALUE/g, `${0.2 * strokeCircumference}`)
    .replace(/DIAMETER/g, `${diameter}`);
}
</script>

<style lang="scss">
@import './spinner';
</style>

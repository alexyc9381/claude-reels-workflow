import {Config} from '@remotion/cli/config';
// Preserve the flat SVG art as RGB PNG frames, then explicitly convert RGB to
// limited-range BT.709. Remotion 4.0.370's default JPEG/zscale path mislabels
// the input matrix; merely tagging the result BT.709 shifts brand colors.
Config.setVideoImageFormat('png');
Config.overrideFfmpegCommand(({args}) => args.map(a =>
  a === 'zscale=matrix=709:matrixin=709:range=limited'
    ? 'scale=out_color_matrix=bt709:out_range=tv' : a));

# n-bottom-sheet



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description | Type                     | Default     |
| --------------------- | ----------------------- | ----------- | ------------------------ | ----------- |
| `afterClose`          | --                      |             | `() => void`             | `undefined` |
| `afterOpen`           | --                      |             | `() => void`             | `undefined` |
| `blocking`            | `blocking`              |             | `boolean`                | `true`      |
| `canBackdropClose`    | `can-backdrop-close`    |             | `boolean`                | `true`      |
| `canSwipeClose`       | `can-swipe-close`       |             | `boolean`                | `true`      |
| `closable`            | `closable`              |             | `boolean`                | `true`      |
| `contentClass`        | `content-class`         |             | `string`                 | `undefined` |
| `duration`            | `duration`              |             | `number`                 | `300`       |
| `expandable`          | `expandable`            |             | `boolean`                | `false`     |
| `footerClass`         | `footer-class`          |             | `string`                 | `undefined` |
| `hashBased`           | `hash-based`            |             | `boolean`                | `true`      |
| `headerClass`         | `header-class`          |             | `string`                 | `undefined` |
| `height`              | `height`                |             | `number`                 | `undefined` |
| `initialSnapPoint`    | `initial-snap-point`    |             | `number`                 | `undefined` |
| `modelValue`          | `model-value`           |             | `boolean`                | `false`     |
| `removeFooterPadding` | `remove-footer-padding` |             | `boolean`                | `false`     |
| `snapPoints`          | --                      |             | `BottomSheetSnapPoint[]` | `undefined` |


## Events

| Event              | Description | Type                                            |
| ------------------ | ----------- | ----------------------------------------------- |
| `closing-started`  |             | `CustomEvent<NBottomSheetClosingStartedDetail>` |
| `instinct-height`  |             | `CustomEvent<number>`                           |
| `updateModelValue` |             | `CustomEvent<boolean>`                          |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

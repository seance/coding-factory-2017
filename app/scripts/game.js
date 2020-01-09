import R from 'ramda'
import esprima from 'esprima'
import { key as encodeKey, decode } from './code'

const encode = message =>
  decode(message, encodeKey)

const ok = (code, ...msgs) => ({
  code: code,
  msgs: R.append('', msgs)
})

const nok = (...msgs) => ({
  code: false,
  msgs: R.append('', msgs)
})

const test = (p, code, okMsgs, nokMsgs) =>
  p() ? ok(code, ...okMsgs) : nok(...nokMsgs)

const tasks = [
  function task1(unlock) {
    return test(
      () => typeof(unlock) === 'function',
      'Z',
      [
        'Function >>unlock<< detected',
        'Releasing first unlock stage'
      ],
      [
        'Function >>unlock<< not defined'
      ])
  },
  function task2(unlock) {
    const fibonacci = unlock(encode(
      'unlock must return function n => fibonacci(n), n >= 1'
    ))
    return test(
      () =>
        typeof(fibonacci) === 'function' &&
        fibonacci(1) === 1 &&
        fibonacci(2) === 1 &&
        fibonacci(3) === 2 &&
        fibonacci(10) === 55 &&
        fibonacci(17) === 1597,
      'I',
      [
        'Fibonacci response accepted',
        'Releasing second unlock stage',
        'Mutating unlock security'
      ],
      [
        'Inputting scrambled argument for >>unlock<< stage 2',
        '> Response not accepted'
      ])
  },
  function task3(unlock) {
    const squareSum = unlock(encode(
      'unlock must return function n => sum of squares [1² .. n²]'
    ))
    return test(
      () =>
        typeof(squareSum) === 'function' &&
        squareSum(1) === 1 &&
        squareSum(2) === 5 &&
        squareSum(3) === 14 &&
        squareSum(5) === 55 &&
        squareSum(10) === 385,
      'G',
      [
        'Square sum response accepted',
        'Releasing third unlock stage',
        'Mutating unlock security'
      ],
      [
        'Inputting scrambled argument for >>unlock<< stage 3',
        '> Response not accepted'
      ])
  },
  function task4(unlock) {
    const collatzLength = unlock(encode(
      'unlock must return function n => collatz sequence length for n, n >= 1'
    ))
    return test(
      () =>
        typeof(collatzLength) === 'function' &&
        collatzLength(1) === 1 &&
        collatzLength(2) === 2 &&
        collatzLength(3) === 8 &&
        collatzLength(4) === 3 &&
        collatzLength(7) === 17,
      '1',
      [
        'Collatz sequence length response accepted',
        'Releasing fourth unlock stage',
        'Mutating unlock security'
      ],
      [
        'Inputting scrambled argument for >>unlock<< stage 4',
        '> Response not accepted'
      ])
  },
  function task5(unlock) {
    const nthPrime = unlock(encode(
      'unlock must return function n => nth prime number, n >= 1'
    ))
    return test(
      () =>
        typeof(nthPrime) === 'function' &&
        nthPrime(1) === 2 &&
        nthPrime(2) === 3 &&
        nthPrime(3) === 5 &&
        nthPrime(10) === 29 &&
        nthPrime(19) === 67,
      '7',
      [
        'Prime number response accepted',
        'Releasing fifth unlock stage',
        'Bomb defusal complete, disarming payload',
        '',
        'Congratulations! You have disarmed the bomb.',
        'Click on Scoreboard to view your ranking!'
      ],
      [
        'Inputting scrambled argument for >>unlock<< stage 5',
        '> Response not accepted'
      ])
  }
]

const runTasks = (doneTasks, print, unlock) => {
  const reduced = R.reduce((m, [task, index]) => {
    if (!m.done) {
      // Task failed, short-circuit execution
      return m
    } else if (doneTasks[index]) {
      // Task completed previously, continue
      return R.merge(m, {
        tasks: R.append(doneTasks[index], m.tasks)
      })
    } else {
      // Try to complete current task
      const { code, msgs } = task(unlock)
      return {
        done: Boolean(code),
        tasks: R.concat(m.tasks, [code]),
        messages: R.concat(m.messages, msgs)
      }
    }
  }, {
    done: true,
    tasks: [],
    messages: []
  }, R.zip(tasks, R.range(0, tasks.length)))

  return R.merge(reduced, {
    messages: R.concat(reduced.messages,
      reduced.done ? [] : print.messages || [])
  })
}

export const runProgram = (doneTasks, code) => {

  function print(...messages) {
    print.messages = print.messages || [];
    messages.forEach(m => print.messages.push('>> ' + m));
  }

  const program = new Function('run', 'tasks', `
    var print, unlock;

    ${print};
    ${code};

    return run(tasks, print, unlock);
  `)

  // Poor man's security sandbox
  const ast = esprima.parse(program.toString())
  const isReturn = s => s.type === 'ReturnStatement'
  const returns = R.filter(isReturn)(ast.body[0].body.body)

  if (returns.length > 1) {
    throw new Error('Invalid top level return statement')
  }

  return program(runTasks, doneTasks)
}

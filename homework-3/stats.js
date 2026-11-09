const PASSING_PERCENTAGE = 67

function isArray(value) {
  return Array.isArray(value)
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== ''
}

export function validateQuizData(data) {
  if (typeof data !== 'object' || data === null || isArray(data)) {
    return false
  }

  if (!isNonEmptyString(data.quizTitle)) {
    return false
  }

  if (!isArray(data.correctAnswers) || data.correctAnswers.length === 0) {
    return false
  }

  if (!isArray(data.attempts) || data.attempts.length === 0) {
    return false
  }

  return data.attempts.every((attempt) => {
    if (typeof attempt !== 'object' || attempt === null || isArray(attempt)) {
      return false
    }

    if (!isNonEmptyString(attempt.name)) {
      return false
    }

    return isArray(attempt.answers) && attempt.answers.length === data.correctAnswers.length
  })
}

export function calculateAttempt(attempt, correctAnswers) {
  let score = 0

  attempt.answers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 1
    }
  })

  const percentage = Math.round((score / correctAnswers.length) * 100)

  return {
    name: attempt.name.trim(),
    score,
    percentage,
    passed: percentage >= PASSING_PERCENTAGE,
  }
}

export function calculateReport(data) {
  const attempts = data.attempts.map((attempt) => calculateAttempt(attempt, data.correctAnswers))

  let totalPercentage = 0
  let passedCount = 0
  let best = attempts[0]

  attempts.forEach((attempt) => {
    totalPercentage += attempt.percentage

    if (attempt.passed) {
      passedCount += 1
    }

    if (attempt.percentage > best.percentage) {
      best = attempt
    }
  })

  return {
    quizTitle: data.quizTitle.trim(),
    questionCount: data.correctAnswers.length,
    participantCount: attempts.length,
    averagePercentage: Math.round(totalPercentage / attempts.length),
    passedCount,
    threshold: PASSING_PERCENTAGE,
    best,
    attempts,
  }
}

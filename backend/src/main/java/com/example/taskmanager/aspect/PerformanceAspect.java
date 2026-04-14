package com.example.taskmanager.aspect;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Aspect
@Component
public class PerformanceAspect {

    private static final Logger logger = LoggerFactory.getLogger(PerformanceAspect.class);

    // ΠΡΟΚΛΗΣΗ 1: Φτιάξε το Pointcut.
    // Adding pointcut
    // Στοχευση των μεθόδων μέσα στο πακέτο service του project.
    @Around("execution(* com.example.taskmanager.service.*.*(..))")
    public Object monitorTime(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();

        // ΠΡΟΚΛΗΣΗ 2: Εδώ η μέθοδος του Service σου "παγώνει".
        // Ποια εντολή πρέπει να γράψεις για να την αφήσεις να εκτελεστεί;
        Object result = proceedingJoinPoint.proceed();

        long timeTaken = System.currentTimeMillis() - startTime;

        // ΠΡΟΚΛΗΣΗ 3: Πώς θα πάρουμε το όνομα της μεθόδου που μόλις έτρεξε;
        // Hint: χρησιμοποίησε το joinPoint.getSignature().getName()
        String methodName = proceedingJoinPoint.getSignature().getName();

        //I want to know and for what taskId we talk about
        logger.info("The method {} for this task id {} run {} ms!",methodName, Arrays.toString(proceedingJoinPoint.getArgs()),timeTaken);

        return result;
    }
}

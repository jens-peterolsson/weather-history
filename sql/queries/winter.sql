SELECT SUBSTRING(weatherDate, 1, 4), AVG(temperatureAverage) 
FROM `weatherdates` 
WHERE temperatureAverage <> 0 
AND (weatherDate like '%-01-%' or
     weatherDate like '%-02-%')
GROUP BY 1
ORDER BY 1 DESC

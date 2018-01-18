<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

$protocol = stripos($_SERVER['SERVER_PROTOCOL'],'https') === true ? 'https:' : 'http:';
$siteUrl = $protocol.'//'.$_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'].'/';

return array(
    /**
     * Environment: Global
     *
     * NOTE: '*' key is required to trigger multi-environment config support, even if you end up not needing it.
     */
		'*' => array(
        'siteUrl' => $siteUrl, // Base site URL
        'omitScriptNameInUrls' => true, // Whether "index.php" should be visible in URLs (true, false, "auto")
        'enableCsrfProtection' => true, // Enable CSRF Protection (recommended, will be enabled by default in Craft 3)
        'cpTrigger' => 'admin', // Control Panel trigger word
        'defaultWeekStartDay' => 0, // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'errorTemplatePrefix' => "_pages/"
        // 'environmentVariables' => array(),
    ),
    /**
     * Environment: Local
     */
		'local' => array(
        'devMode' => true,
    ),
    /**
     * Environment: Development
     */
    'development' => array(
        'devMode' => true,
    ),
    /**
     * Environment: Staging
     */
		'staging' => array(
        'devMode' => true,
    ),
    /**
     * Environment: Production
     */
    'production' => array(
        'devMode' => false,
        'cooldownDuration' => 0,
    ),
);

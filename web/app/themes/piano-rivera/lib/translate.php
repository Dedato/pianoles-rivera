<?php
/**
 * Translate function for WPML to translate strings in Twig files
 */
function wpml_translate_string($key) {   
  static $strings = null;
  if ($strings == null) {
    $strings = array(         
      'could-not-find' => __("Sorry, we couldn't find what you're looking for.", "sage"),
      'page-not-found' => __("Page not found", "sage")
    );
  }
  return isset($strings[$key])?$strings[$key]:'';
}
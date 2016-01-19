<?php
/**
 * The template for displaying 404 pages (Not Found)
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context                  = Timber::get_context();
$frontpage                = get_option('page_on_front');
$context['sections']      = get_field('one_page_sections', $frontpage);
$context['section_home']  = get_field('one_page_sections', $frontpage)[0];
Timber::render('404.twig', $context);

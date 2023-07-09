<?php
/**
 * Plugin Name:       OpenAgenda Unilim
 * Description:       Plugin OpenAgenda de l'Université de Limoges
 * Requires at least: 5.5
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Gleen Camille
 */

/**
 * Init Admin Menu.
 *
 * @return void
 */

add_action('admin_menu', 'openagenda_init_menu');

function openagenda_init_menu()
{
    add_menu_page(
        __('OpenAgenda unilim', 'openagenda'),
        __('OpenAgenda unilim', 'openagenda'),
        'manage_options',
        'openagenda',
        'openagenda_admin_page',
        'dashicons-admin-post',
        '2.1'
    );
}

/**
 * Init Admin Page.
 *
 * @return void
 */
function openagenda_admin_page()
{
    require_once plugin_dir_path(__FILE__) . 'templates/app.php';
}

add_action('admin_enqueue_scripts', 'openagenda_admin_enqueue_scripts');

/**
 * Enqueue scripts and styles.
 *
 * @return void
 */
function openagenda_admin_enqueue_scripts()
{
    wp_enqueue_style('ul-openagenda-style', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_enqueue_script('ul-openagenda-script', plugin_dir_url(__FILE__) . 'build/index.js', array( 'wp-element' ), '1.0.0', true);
    wp_localize_script('ul-openagenda-script', 'WPURLS', array( 'siteurl' => get_option('siteurl') ));
    wp_localize_script('ul-openagenda-script', 'wpApiSettings', array(
        'root' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest')
    ));

}
// Uninstall procedure.
register_uninstall_hook(__FILE__, 'openagenda_uninstallation');

/**
 * Uninstall procedure.
 *
 * We're not doing anything here, so no options will be deleted.
 */
function openagenda_uninstallation()
{
    // No action taken.
}

/*Custom Post type */
function cw_post_type_openagenda()
{
    $supports = array(
        'title', // post title
        'editor', // post content
        'author', // post author
        'thumbnail', // featured images
        'excerpt', // post excerpt
        'custom-fields', // custom fields
        'comments', // post comments
        'revisions', // post revisions
        'post-formats', // post formats
    );

    $labels = array(
        'name' => _x('openagenda', 'plural'),
        'singular_name' => _x('openagenda', 'singular'),
        'menu_name' => _x('openagenda', 'admin menu'),
        'name_admin_bar' => _x('openagenda', 'admin bar'),
        'add_new' => _x('Add New', 'add new'),
        'add_new_item' => __('Add New openagenda'),
        'new_item' => __('New openagenda'),
        'edit_item' => __('Edit openagenda'),
        'view_item' => __('View openagenda'),
        'all_items' => __('All openagenda'),
        'search_items' => __('Search openagenda'),
        'not_found' => __('No openagenda found.'),
    );

    $args = array(
        'supports' => $supports,
        'labels' => $labels,
        'public' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'openagenda'),
        'has_archive' => true,
        'hierarchical' => false,
    );

    register_post_type('agendas', $args);
}

add_action('init', 'cw_post_type_openagenda');


add_action('rest_api_init', function () {
    register_rest_route('openagenda/v1', '/updateoptions', array(
        'methods' => 'POST',
        'callback' => 'handle_update_options',
        'permission_callback' => function() {
            return current_user_can( 'edit_others_posts' );
        },
    ));
});

function handle_update_options(WP_REST_Request $request)
{
    $raw_data = $request->get_body();
    $data = json_decode($raw_data, true);

    error_log("Raw data: " . $raw_data);

    $old_data = get_option('plugins_options_openagenda_data');
    $isOldDataEmpty = empty($old_data);

    $updated = update_option('plugins_options_openagenda_data', $data);
    error_log("Updated? " . ($updated ? "yes" : "no"));

    $new_data = get_option('plugins_options_openagenda_data');

    if ($updated && $isOldDataEmpty) {
        return new WP_REST_Response(array('success' => true, 'old_data' => $old_data, 'data' => $new_data), 200);
    } else {
        return new WP_REST_Response(array('success' => false, 'old_data' => $old_data, 'data' => $new_data), 500);
    }
}


add_action('rest_api_init', function () {
    register_rest_route('openagenda/v1', '/getoptions', array(
        'methods' => 'GET',
        'callback' => 'handle_get_options',
       
    ));
});

function handle_get_options(WP_REST_Request $request)
{
    $data = get_option('plugins_options_openagenda_data');
    return new WP_REST_Response($data, 200);
}


function get_agenda_data()
{
    $data = get_option('plugins_options_openagenda_data');

    if ($data && is_array($data)) {
        $id = $data['id'];
        $fields = $data['fields'];
        $pagination = $data['pagination'];
        $layout = $data['layout'];
        $eventspercolumn = $data['eventspercolumn'];
        $rowcount = $data['rowcount'];
        $eventcount = $data['eventcount'];
        $links = $data['links'];
        $categories = $data['categories'];
        $relative = $data['relative'];

        return array(
            'id' => $id,
            'fields' => $fields,
            'pagination' => $pagination,
            'layout' => $layout,
            'eventspercolumn' => $eventspercolumn,
            'rowcount' => $rowcount,
            'eventcount' => $eventcount,
            'links' => $links,
            'categories' => $categories,
            'relative' => $relative,


        );
    }

    return array();
}
/**
 * API REST
 */
add_action('rest_api_init', 'init_rest_route');

function init_rest_route()
{
    register_rest_route('openagenda', '/agendas', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'get_agendas',
        'show_in_index' => true,
        'permission_callback' => '__return_true',
        ));
    register_rest_route('openagenda', '/events/category', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'get_agendas_all',
        'show_in_index' => true,
        'permission_callback' => '__return_true',
        ));
    register_rest_route('openagenda', '/events/categories/(?P<id>\d+(,\d+)*)', array(
        'methods' => 'GET',
        'callback' => 'get_events_cat',
        'show_in_index' => true,
        'permission_callback' => '__return_true',
    ));
    register_rest_route('openagenda', '/id/(?P<id>\d+(,\d+)*)/events(?P<includeFields>.+)(?P<keyword>.+)(?P<oaq>.+)(?P<timeframe>.+)(?P<uid>.+)(?P<categories>.+)(?P<relative>.+)', array(
        'methods' => 'POST',
        'callback' => 'get_events',
        'show_in_index' => true,
        'permission_callback' => '__return_true',
    ));
}



function get_agendas()
{
    $response = wp_remote_get(
        'http://127.0.0.1:8000/openagenda/agendas',
        array(
    'timeout' => 120,
    )
    );
    $data = wp_remote_retrieve_body($response);

    return $data ?
        new WP_REST_Response(json_decode($data, true)) :
        new WP_Error('no-content', __('No content', 'openagenda'), array('status' => 500));
}


function get_agendas_all()
{
    $response = wp_remote_get(
        'http://127.0.0.1:8000/openagenda/events/category',
        array(
    'timeout' => 120,
    )
    );
    $data = wp_remote_retrieve_body($response);

    return $data ?
        new WP_REST_Response(json_decode($data, true)) :
        new WP_Error('no-content', __('No content', 'openagenda'), array('status' => 500));
}


function get_events($request)
{
    $ids = $request->get_param('id');
    $fields = $request->get_param('fields');
    $oaq = $request->get_param('oaq');
    $keyword = $request->get_param('keyword');
    $timeframe = $request->get_param('timeframe');
    $categories = $request->get_param('categories');
    $uid = $request->get_param('uid');
    $relative = $request->get_param('relative');
   

    $url = "http://127.0.0.1:8000/openagenda/id/$ids/events/";

    $body = array();

    if (!empty($fields)) {
        $body['includeFields'] = $fields;
    }

    if (!empty($keyword)) {
        $body['keyword'] = $keyword;
    }

    if (!empty($oaq)) {
        $body['oaq'] = $oaq;
    }
    if (!empty($timeframe)) {
        $body['timeframe'] = $timeframe;
    }
    if (!empty($categories)) {
        $body['categories'] = $categories;
    }
    if (!empty($uid)) {
        $body['uid'] = $uid;
    }
    if (!empty($relative)) {
        $body['relative'] = $relative;
    }

    $response = wp_remote_post(
        $url,
        array(
            'timeout' => 120,
            'headers' => array('Content-Type' => 'application/json; charset=utf-8'),
            'body' => json_encode($body)
        )
    );

    if (is_wp_error($response)) {
        return new WP_Error('no-content', __('Failed to retrieve content', 'openagenda'), array( 'status' => 500 ));
    }

    $response_body = wp_remote_retrieve_body($response);

    return $response_body ?
        new WP_REST_Response(json_decode($response_body, true)) :
        new WP_Error('no-content', __('No content', 'openagenda'), array('status' => 500));
}

global $ul_openagenda_url;
$ul_openagenda_url = '';

function ul_openagenda_sc($atts)
{

    $id = isset($atts['id']) ? $atts['id'] : null;
    $fields = isset($atts['fields']) ? $atts['fields'] : '';
    $pagination = isset($atts['pagination']) ? $atts['pagination'] : '';
    $layout = isset($atts['layout']) ? $atts['layout'] : '';
    $eventcount = isset($atts['eventcount']) ? intval($atts['eventcount']) : 0;
    $eventspercolumn = isset($atts['eventspercolumn']) ? intval($atts['eventspercolumn']) : 0;
    $rowcount = isset($atts['rowcount']) ? intval($atts['rowcount']) : 0;
    $links = isset($atts['links']) ? $atts['links'] : '';
    $categories = isset($atts['categories']) ? $atts['categories'] : '';
    $relative = isset($atts['relative']) ? $atts['relative'] : '';


    wp_enqueue_style('ul-openagenda-style', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_enqueue_script('ul-openagenda-script', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-element'), '1.0.0', true);
    wp_localize_script('ul-openagenda-script', 'WPURLS', array('siteurl' => get_option('siteurl'), 'ajaxurl' => admin_url('admin-ajax.php')));

    wp_localize_script('ul-openagenda-script', 'OpenAgendaData', array(
        'id' => $id,
        'fields' => $fields,
        'pagination' => $pagination,
        'layout' => $layout,
        'eventspercolumn' => $eventspercolumn,
        'eventcount' => $eventcount,
        'rowcount' => $rowcount,
        'links' => $links,
        'relative' => $relative,
        'categories'=>$categories


    ));

    ob_start();
    ?>
      <div id="ul_openagenda_front">
        <h2>Loading...</h2>
      </div>
    <?php

    return ob_get_clean();

}


add_shortcode('ul_openagenda', 'ul_openagenda_sc');
